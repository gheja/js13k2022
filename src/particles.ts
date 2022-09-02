function destroyThis()
{
	this.parentNode.removeChild(this);
}

function emitParticle(x: number, y: number, className: string, duration: number)
{
	let a: HTMLElement;
	
	a = document.createElement("div");
	a.className = className;
	a.style.left = x + "px";
	a.style.top = y + "px";
	document.body.appendChild(a);

	window.setTimeout(destroyThis.bind(a), duration);
}