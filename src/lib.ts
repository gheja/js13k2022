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
