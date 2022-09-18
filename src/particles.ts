function destroyThis()
{
	removeDomElement(this);
}

function emitParticle(x: number, y: number, spriteX: number, spriteY: number, width: number, height: number, animation: string, duration: number)
{
	let a: HTMLElement;
	
	a = newSpriteDomObject(_divLayer, spriteX, spriteY, width, height);
	a.style.transform = "translateX(" + _z(x) + "px) translateY(" + _z(_floorHeight / 2 - height) + "px) translateZ(" + _z(y) + "px) ";
	a.style.animation = animation + " " + duration + "ms forwards";

	window.setTimeout(destroyThis.bind(a), duration);
}