class GameObjectSlot extends GameObject
{
    domObject2: HTMLElement;

    constructor(position: Vec2D)
    {
        super(position, 10, 10, "Slot", "A place where you can place stuffs.");
        this.domObject2 = newSpriteDomObject(this.domObject, 120, 18, 10, 10);
		this.domObject2.style.transform = "translateY(" + _z(5) + "px) rotateX(90deg)";
    }

    updateSprite()
    {
        this.domObject.style.display = (this.childObjects.length != 0 ? "none" : "");
    }
}