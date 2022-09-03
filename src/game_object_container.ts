class GameObjectContainer extends GameObject
{
    domObject2: HTMLElement;

    constructor(position: Vec2D)
    {
        super(position);
        this.domObject2 = newSpriteDomObject(this.domObject, 0, 18, 10, 10);
    }
}