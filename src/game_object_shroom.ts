class GameObjectShroom extends GameObjectIngredient
{
    domObject2: HTMLElement;

    constructor(position: Vec2D)
    {
        super(position, 10, 10, "Fire shroom", "Mushroom", OBJ_SHROOM);
        this.domObject2 = newSpriteDomObject(this.domObject, 0, 60, 10, 10);
        this.cookedForTarget = 420;
    }
}