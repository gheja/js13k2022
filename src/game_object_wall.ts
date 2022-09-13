class GameObjectWall extends GameObject
{
    domObjectLeft: HTMLElement;
    domObjectFront: HTMLElement;
    domObjectTop: HTMLElement;
    domObjectRight: HTMLElement;
    repeatWidth: number;
    // repeatHeight: number;

    constructor(position: Vec2D, width: number=1, height: number=1, zHeight: number=1)
    {
        super(position, 10, 10, "e", "e");

        this.collidable = true;

        this.domObjectTop = newSpriteDomObject(this.domObject, 40, 70, 10, 10);
        this.domObjectLeft = newSpriteDomObject(this.domObject, 30, 70, 10, 10);
        this.domObjectRight = newSpriteDomObject(this.domObject, 30, 70, 10, 10);
        this.domObjectFront = newSpriteDomObject(this.domObject, 30, 70, 10, 10);

        this.domObjectTop.className = "bt";
        this.domObjectLeft.className = "bl";
        this.domObjectRight.className = "br";
        this.domObjectFront.className = "bf";

        this.repeatWidth = width;
        // this.repeatHeight = height;

        // less readable but Google Closure Compiler likes more
        
        // x
        this.domObjectFront.style.width = this.domObjectTop.style.width = _z(width * 10) + "px";
        this.domObjectRight.style.left = _z((width - 1) * 10) + "px";

        // y
        // TODO...

        // z
        this.domObjectTop.style.top = this.domObjectFront.style.top = this.domObjectLeft.style.top = this.domObjectRight.style.top = - _z((zHeight - 1) * 10) + "px";
        this.domObjectFront.style.height = this.domObjectRight.style.height = this.domObjectLeft.style.height = _z(zHeight * 10) + "px";
    }
}