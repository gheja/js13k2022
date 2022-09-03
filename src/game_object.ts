class GameObject
{
	position: Vec2D;
	velocity: Vec2D;
	domObject: HTMLElement;
	interactable: boolean = false;

	constructor(position: Vec2D)
	{
		this.domObject = newElement(_divLayer, "div", "o");
		this.position = new Vec2D();
		this.position.copyFrom(position);
		this.velocity = new Vec2D();
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
		this.domObject.style.left = _x(this.position.x) + "px";
		this.domObject.style.top = _y(this.position.y) + "px";
	}
}