#!/bin/bash

tmp=`readlink -f "$0"`
dir=`dirname $tmp`
source_dir="${dir}/src"

{
echo -n "const GFX_SPRITES = \"data:image/png;base64,"
cat "${source_dir}/graphics/sprites_optimized.png" | base64 --wrap 0
echo "\";"
echo -n "const GFX_FLOOR = \"data:image/png;base64,"
cat "${source_dir}/graphics/floor_optimized.png" | base64 --wrap 0
echo "\";"
} > "${source_dir}/data_graphics.ts"
