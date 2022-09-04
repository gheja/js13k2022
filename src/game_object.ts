class GameObject
{
	position: Vec2D;
	velocity: Vec2D;
	domObject: HTMLElement;
	interactable: boolean = false;
	domTransformExtra: string = "";
	width: number;
	height: number;

	constructor(position: Vec2D, width: number, height: number)
	{
		this.domObject = newElement(_divLayer, "div", "o");
		this.domObject.style.width = width + "px";
		this.domObject.style.height = height + "px";
		this.position = new Vec2D();
		this.position.copyFrom(position);
		this.velocity = new Vec2D();

		this.width = width;
		this.height = height;
	}

	moveAndSlide(delta: number)
	{
		// hello godot
		this.position.x += this.velocity.x * (delta/1000);
		this.position.y += this.velocity.y * (delta/1000);
	}

	updateSprite()
	{

	}

	update()
	{
		this.updateSprite();
		this.domObject.style.transform = "translateX(" + _z(this.position.x) + "px) translateY(" + _z(_floorHeight / 2 - this.height) + "px) translateZ(" + _z(this.position.y) + "px) " + this.domTransformExtra;
	}
}