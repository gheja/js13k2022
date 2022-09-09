class GameObjectWall extends GameObject
{
    domObjectLeft: HTMLElement;
    domObjectFront: HTMLElement;
    domObjectTop: HTMLElement;
    domObjectRight: HTMLElement;

    constructor(position: Vec2D)
    {
        super(position, 10, 10, "e", "e");

        this.collidable = true;

        this.domObjectTop = newSpriteDomObject(this.domObject, 40, 70, 10, 10);
        this.domObjectTop.className = "bt";

        this.domObjectLeft = newSpriteDomObject(this.domObject, 30, 70, 10, 10);
        this.domObjectLeft.className = "bl";

        this.domObjectRight = newSpriteDomObject(this.domObject, 30, 70, 10, 10);
        this.domObjectRight.className = "br";

        this.domObjectFront = newSpriteDomObject(this.domObject, 30, 70, 10, 10);
        this.domObjectFront.className = "bf";
    }
}