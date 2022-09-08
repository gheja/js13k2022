class GameObjectDeputy extends GameObject
{
	domObjectBodyFront: HTMLElement;
	
	constructor(position: Vec2D)
	{
		super(position, 10, 18, "Goblin", "The guy who runs the kitchen when you're not around.");

		this.domObject.style.width = _z(10) + "px";
		this.domObject.style.height = _z(18) + "px";
		this.domObjectBodyFront = newSpriteDomObject(this.domObject, 40, 2, 10, 18)
	}
}