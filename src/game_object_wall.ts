class GameObjectWall extends GameObject
{
    domObjectLeft: HTMLElement;
    domObjectFront: HTMLElement;
    domObjectTop: HTMLElement;
    domObjectRight: HTMLElement;

    constructor(position: Vec2D, width: number=1, height: number=1, zHeight: number=1)
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

        // x
        this.domObjectFront.style.width = _z(width * 10) + "px";
        this.domObjectTop.style.width = _z(width * 10) + "px";
        this.domObjectRight.style.left = _z((width - 1) * 10) + "px";

        // y
        // TODO...

        // z
        this.domObjectTop.style.top = - _z((zHeight - 1) * 10) + "px";
        this.domObjectFront.style.top = this.domObjectTop.style.top;
        this.domObjectLeft.style.top = this.domObjectFront.style.top;
        this.domObjectRight.style.top = this.domObjectFront.style.top;

        this.domObjectFront.style.height = _z(zHeight * 10) + "px";
        this.domObjectRight.style.height = this.domObjectFront.style.height;
        this.domObjectLeft.style.height = this.domObjectFront.style.height;
    }
}