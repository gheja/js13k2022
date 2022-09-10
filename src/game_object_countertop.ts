class GameObjectCountertop extends GameObjectWall
{
    constructor(position: Vec2D, width: number=1, height: number=1, zHeight: number=1)
    {
        super(position, width, height, zHeight);
        replaceSpriteDomObject(this.domObjectTop, 30, 60, 10, 10, true);
        replaceSpriteDomObject(this.domObjectLeft, 20, 60, 10, 10, true);
        replaceSpriteDomObject(this.domObjectRight, 20, 60, 10, 10, true);
        replaceSpriteDomObject(this.domObjectFront, 20, 60, 10, 10, true);
    }
}