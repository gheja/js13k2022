function dist2d(a: Vec2D, b: Vec2D)
{
	return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function getAngle2D(a: Vec2D, b: Vec2D): number
{
	return (Math.atan2(b.y - a.y, b.x - a.x) / (Math.PI * 2) + 1) % 1;
}

function arrayPick(a: Array<any>)
{
	return a[Math.floor(Math.random() * a.length)];
}

function round2(x: number)
{
	return (Math.abs(x) < 0.3) ? 0 : x;
}

function clamp(min: number, max: number, x: number)
{
	return Math.min(Math.max(x, min), max);
}

function randFloat()
{
	return Math.random();
}

function randPlusMinus(x)
{
	return (randFloat() - 0.5) * x * 2;
}

// thanks https://github.com/nicolas-van/sonant-x
// n: halfnote, 128 = A4, 129 = A#4, 130 = B4, ...
function getNoteFrequency(n)
{
	return Math.pow(1.059463094, n - 128) * 440;
}

function arrayShuffle(a) {
	// thx https://stackoverflow.com/a/6274381/460571
	var j, x, i;
	
	for (i = a.length; i; i--)
	{
		j = Math.floor(Math.random() * i);
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	}
}

function st(n)
{
	if (n == 1)
	{
		return "1st";
	}
	else if (n == 2)
	{
		return "2nd";
	}
	else if (n == 3)
	{
		return "3rd";
	}
	else
	{
		return n + "th";
	}
}

function addClass(obj: HTMLElement, className: string)
{
	obj.classList.add(className);
}

function removeClass(obj: HTMLElement, className: string)
{
	obj.classList.remove(className);
}

function newDomElement(parentNode: HTMLElement, tagName: string, className: string): HTMLElement
{
	let a = document.createElement(tagName);
	a.className = className;
	parentNode.appendChild(a);
	return a;
}

function getDomElement(name: string)
{
	return document.getElementById(name);
}

function removeDomElement(obj: HTMLElement)
{
	obj.parentNode.removeChild(obj);
}

function lerp(a: number, b: number, ratio: number)
{
	return a + (b - a) * ratio;
}

// cache the sprites so there's no need to process them every time
let _spriteCache: Array<any> = [];

function getSprite(x: number, y: number, width: number, height: number)
{
	let a = [x, y, width, height].join(",");

	if (!_spriteCache[a])
	{
		let canvas = document.createElement("canvas");
		canvas.width = _z(width);
		canvas.height = _z(height);
		let ctx = canvas.getContext("2d");
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(_sprites, x, y, width, height, 0, 0, _z(width), _z(height));
		_spriteCache[a] = canvas.toDataURL();
	}

	return _spriteCache[a];
}

function replaceSpriteDomObject(obj: HTMLElement, x: number, y: number, width: number, height: number, doNotResize: boolean = false)
{
	obj.style.background = "url(" + getSprite(x, y, width, height) + ")";
	if (!doNotResize)
	{
		obj.style.width = _z(width) + "px";
		obj.style.height = _z(height) + "px";
	}
}

function newSpriteDomObject(parentNode: HTMLElement, x: number, y: number, width: number, height: number)
{
	let obj = document.createElement("div");
	parentNode.appendChild(obj);

	replaceSpriteDomObject(obj, x, y, width, height);

	return obj;
}

function _z(a: number)
{
	return a * _zoom;
}

function _x(x: number)
{
	return (x + _padX) * _zoom;
}

function _y(y: number)
{
	return (y + _padY) * _zoom;
}

// This is for debugging. In the final build it will be an empty function and
// will be removed by tscc or Google Closure Compiler.
function _assert(condition: any)
{
	if (!IS_PROD_BUILD)
	{
		if (!(condition as boolean))
		{
			document.body.style.background = "#f00";
			document.title = "*** Assert failed, check console! ***";
			throw new Error("Assert failed!");
		}
	}
}

// This is for debugging. In the final build it will be an empty function and
// will be removed by tscc or Google Closure Compiler.
function _exception(message: string)
{
	if (!IS_PROD_BUILD)
	{
		throw new Error(message);
	}
}

function pointInBox(p1: Vec2D, p2: Vec2D, width1: number, height1: number, width2: number, height2: number)
{
	if ((p1.x > p2.x - width1) && (p1.x < p2.x + width2) && (p1.y > p2.y - height1) && (p1.y < p2.y + height2))
	{
		return true;
	}

	return false;
}

function _ticksToSeconds(ticks: number)
{
	return (ticks / 60).toFixed(1);
}

function setInnerHTML(name: string, s: string)
{
	let obj = getDomElement(name);

	// To prevent updating the DOM element on every frame we note the latest
	// value, but innerHTML gets modified by the browser after setting it.
	if (obj.dataset['a'] != s)
	{
		obj.innerHTML = s;
		obj.dataset["a"] = s;
		obj.style.display = (s ? "" : "none");
	}

}

function playSound(n: number)
{
	zzfx(..._sounds[n]);
}