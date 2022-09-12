class GameObjectCarrot extends GameObjectIngredient
{
    domObject2: HTMLElement;

    constructor(position: Vec2D)
    {
        super(position, 10, 10, "Fresh carrot", "Yummie", OBJ_CARROT);
        this.domObject2 = newSpriteDomObject(this.domObject, 40, 60, 10, 10);
        this.cookedForTarget = 1800;
    }
}