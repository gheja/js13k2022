function destroyThis()
{
	this.parentNode.removeChild(this);
}

function emitParticle(x: number, y: number, className: string, duration: number)
{
	let a: HTMLElement;
	
	a = newSpriteDomObject(_divLayer, 5, 14, 3, 3)
	a.style.left = _x(x) + "px";
	a.style.top = _y(y) + "px";
	a.style.animation = "dust2 0.4s";

	window.setTimeout(destroyThis.bind(a), duration);
}