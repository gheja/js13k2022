function destroyThis()
{
	this.parentNode.removeChild(this);
}

function emitParticle(x: number, y: number, className: string, duration: number)
{
	let a: HTMLElement;
	
	a = newSpriteDomObject(_divLayer, 5, 14, 3, 3)
	a.style.transform = "translateX(" + x + "px) translateY(" + (_floorHeight / 2 - 3) + "px) translateZ(" + (y) + "px) ";
	a.style.animation = "dust2 0.4s";

	window.setTimeout(destroyThis.bind(a), duration);
}