class GameObject
{
	position: Vec2D;
	velocity: Vec2D;
	domObject: HTMLElement;
	interactable: boolean = false;
	domTransformExtra: string = "";
	width: number;
	height: number;
	highlighted: boolean = false;
	name: string;
	description: string;

	constructor(position: Vec2D, width: number, height: number, name: string, description: string)
	{
		this.domObject = newElement(_divLayer, "div", "o");
		this.domObject.style.width = width + "px";
		this.domObject.style.height = height + "px";
		this.position = new Vec2D();
		this.position.copyFrom(position);
		this.velocity = new Vec2D();
		this.name = name;
		this.description = description;

		this.width = width;
		this.height = height;
	}

	getDescription()
	{
		return "<b>" + this.name + "</b><br/>" + this.description + "<br/>";
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

	updateHighlight()
	{
        if (_game.ticks % 20 < 10)
        {
            if (this.highlighted)
            {
		        this.domObject.style.opacity = "0.5";
            }
        }
        else
        {
		    this.domObject.style.opacity = "1";
        }
	}

	update()
	{
		let grabbed2 = 0;

		if (_game.grabbedObject == this)
		{
			this.position.copyFrom(_game.playerObject.position);
			this.position.y += 0.2;
			grabbed2 = 5;
		}

		this.updateSprite();
		this.updateHighlight();
		this.domObject.style.transform = "translateX(" + _z(this.position.x) + "px) translateY(" + _z(_floorHeight / 2 - this.height - grabbed2) + "px) translateZ(" + _z(this.position.y) + "px) " + this.domTransformExtra;
	}
}