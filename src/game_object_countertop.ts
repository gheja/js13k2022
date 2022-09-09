class GameObjectCountertop extends GameObjectWall
{
    constructor(position: Vec2D)
    {
        super(position);
        replaceSpriteDomObject(this.domObjectTop, 30, 60, 10, 10);
        replaceSpriteDomObject(this.domObjectLeft, 20, 60, 10, 10);
        replaceSpriteDomObject(this.domObjectRight, 20, 60, 10, 10);
        replaceSpriteDomObject(this.domObjectFront, 20, 60, 10, 10);
    }
}