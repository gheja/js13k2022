class GameObjectSeasoning extends GameObject
{
    domObject2: HTMLElement;

    constructor(position: Vec2D)
    {
        super(position, 10, 10, "Chili and pepper", "For the perfect flavor");
        this.domObject2 = newSpriteDomObject(this.domObject, 50, 40, 10, 10);
    }
}