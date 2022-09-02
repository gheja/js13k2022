#!/bin/bash

name="js13k2021"
tmp=`readlink -f "$0"`
dir=`dirname $tmp`
source_dir="${dir}/src"
target_dir="/tmp/build"
extra_dir="/home/gheja/works_local/extra"
final_dir="${dir}"
min_dir="${dir}/tmp/min"
csv="${final_dir}/build_stats.csv"

if [ $TERM == "xterm" ] || [ $TERM == "screen" ]; then
	color_error='\033[1;31m'
	color_success='\033[1;32m'
	color_title='\033[1;38m'
	color_default='\033[0m'
else
	color_error=''
	color_success=''
	color_title=''
	color_default=''
fi

_title()
{
	echo ""
	echo -ne "${color_title}"
	echo "$@"
	echo -ne "${color_default}"
}

_error()
{
	echo -ne "${color_error}"
	echo "$@"
	echo -ne "${color_default}"
}

_success()
{
	echo -ne "${color_success}"
	echo "$@"
	echo -ne "${color_default}"
}

try()
{
	$@
	
	result=$?
	if [ $result != 0 ]; then
		_error "ERROR: \"$@\" failed with exit code $result."
		exit 1
	fi
}

function get_size()
{
	local files="$@"
	
	cat $files | wc -c | awk '{ print $1; }'
}

function get_lines()
{
	local files="$@"
	
	cat $files | wc -l | awk '{ print $1; }'
}


if [ -e "$target_dir" ]; then
	rm -r "$target_dir"
fi

mkdir "$target_dir"

cd "$target_dir"


### stage1 - compilation of typescript to javascript, minimization of javascript and css files

mkdir stage1
mkdir stage1/3rdparty
cd stage1

now=`date +%Y%m%d_%H%M%S`
now2=`date '+%Y-%m-%d %H:%M:%S'`
zip_prefix="${name}_${now}"

_title "Copying files to build directory..."

try rsync -xa --exclude '*.js' --exclude '*.js.map' --exclude '*.zip' "${source_dir}/" ./
try rsync -xa "${source_dir}/3rdparty/" ./3rdparty/
try cp "${source_dir}/externs.js" ./

zip -r9 ${zip_prefix}_original.zip .

if [ -d "${extra_dir}" ]; then
	try rsync -xa "${extra_dir}/" ./
fi


_title "Checking and installing node packages..."

echo "travis_fold:start:npm"

try npm install typescript-closure-compiler google-closure-compiler

echo "travis_fold:start:npm"

export PATH="${target_dir}/stage1/node_modules/.bin:${PATH}"

files_html="index.html"
files_javascript=`cat index.html | grep -E '<script.* src="([^"]+)"' | grep -Eo 'src=\".*\"' | cut -d \" -f 2 | grep -v '/socket.io' | grep -vE '^3rdparty/'`
files_javascript_3rdparty=`cat index.html | grep -E '<script.* src="([^"]+)"' | grep -Eo 'src=\".*\"' | cut -d \" -f 2 | grep -v '/socket.io' | grep -E '^3rdparty/'`
files_typescript=`echo "$files_javascript" | sed -r 's/\.js$/.ts/g'`
files_css=`cat index.html | grep -E '<link type="text/css" rel="stylesheet" href="([^"]+)"' | grep -Eo 'href=\".*\"' | cut -d \" -f 2`

# cat ./src/$i | sed -e '/DEBUG BEGIN/,/\DEBUG END/{d}' | grep -vE '^\"use strict\";$' >> ./build/stage1/merged.js

lines_html=`get_lines $files_html`
lines_typescript=`get_lines $files_typescript`
lines_css=`get_lines $files_css`

size_html=`get_size $files_html`
size_typescript=`get_size $files_typescript`
size_css=`get_size $files_css`


_title "Compiling TypeScript to JavaScript..."

echo "travis_fold:start:tscc"

try tscc $files_typescript

echo "travis_fold:end:tscc"


_title "Minimizing JavaScript using Google Closure Compiler - 1/2: pretty print..."

echo "travis_fold:start:closure-compiler-1"

try google-closure-compiler \
	--compilation_level ADVANCED \
	--warning_level VERBOSE \
	--language_in ECMASCRIPT_2018 \
	--language_out ECMASCRIPT_2018 \
	--formatting PRETTY_PRINT \
	--formatting SINGLE_QUOTES \
	--externs externs.js \
	--js_output_file min_pretty.js \
	$files_javascript_3rdparty $files_javascript

echo "travis_fold:end:closure-compiler-1"


_title "Minimizing JavaScript using Google Closure Compiler - 2/2: whitespace removal..."

echo "travis_fold:start:closure-compiler-2"

try google-closure-compiler \
	--compilation_level WHITESPACE \
	--language_in ECMASCRIPT_2018 \
	--language_out ECMASCRIPT_2018 \
	--formatting SINGLE_QUOTES \
	--externs externs.js \
	--js_output_file min.js \
	min_pretty.js

echo "travis_fold:end:closure-compiler-2"


_title "Minimizing CSS..."

cat $files_css | \
	sed -r 's/^\s+//g' | \
	sed -r 's/\s+$//g' | \
	tr -d '\r\n' | \
	sed -r 's/}/}\n/g' \
	> min.css

cd ..


### stage2 - compiling the final html and creating zip files

mkdir stage2
cd stage2

cp ../stage1/min.css ../stage1/min.js ../stage1/index.min.html ../stage1/twemoji.ttf ./


_title "Embedding files into final HTML..."

cat index.min.html | sed \
	-e '/<!-- insert minified javascript here -->/{' \
	-e 'i <script>' \
	-e 'r min.js' \
	-e 'a </script>' \
	-e 'd}' \
	-e '/<!-- insert minified css here -->/{' \
	-e 'i <style>' \
	-e 'r min.css' \
	-e 'a </style>' \
	-e 'd}' \
	> index.html


_title "Creating ZIP files..."

try zip -9 ${zip_prefix}.zip index.html
try zip -9 ${zip_prefix}_twemoji.zip index.html twemoji.ttf

size2_html=`get_size index.min.html`
size2_javascript=`get_size min.js`
size2_css=`get_size min.css`
size2_zip=`get_size ${zip_prefix}.zip`

cd ..


_title "Extracting ZIP file to test directory..."

### final steps

cp stage1/*.zip ./
cp stage2/*.zip ./

cp *.zip ${final_dir}/

if [ -e "${min_dir}" ]; then
	rm -r ${min_dir}
fi

mkdir -p "${min_dir}"

cd ${min_dir}

cp ${final_dir}/${zip_prefix}_twemoji.zip ./
unzip ${zip_prefix}_twemoji.zip


_title "Some stats"

cd "${target_dir}"

ls -alb stage2/ *.zip

echo ""
echo "HTML: ${lines_html} lines, ${size_html} -> ${size2_html} bytes"
echo "TypeScript: ${lines_typescript} lines, ${size_typescript} -> ${size2_javascript} bytes"
echo "CSS: ${lines_css} lines, ${size_css} -> ${size2_css} bytes"
echo "Total source: $((size_html + size_typescript + size_css)) -> ${size2_zip} bytes in final ZIP"

cd "${source_dir}"

git_hash=`git rev-parse HEAD 2>/dev/null`

if [ ! -e "$csv" ]; then
	echo "date_time;filename;git_hash;lines_html;size_html;size2_html;lines_typescript;size_typescript;size2_javascript;lines_css;size_css;size2_css;size2_zip" > $csv
fi

echo "${now2};${zip_prefix}.zip;${git_hash};${lines_html};${size_html};${size2_html};${lines_typescript};${size_typescript};${size2_javascript};${lines_css};${size_css};${size2_css};${size2_zip}" >> $csv


size2_limit=13312
percent=$((size2_zip * 100 / size2_limit))


echo ""

if [ ${size2_zip} -gt ${size2_limit} ]; then
	_error "Final ZIP is ${size2_zip} bytes, more than ${size2_limit}!"
	
	exit 1
fi

_success "Final ZIP file is ${size2_zip} bytes of ${size2_limit} (${percent}%)!"

exit 0
