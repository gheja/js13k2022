class GameObjectMeat extends GameObjectIngredient
{
    domObject2: HTMLElement;

    constructor(position: Vec2D)
    {
        super(position, 10, 18, "Meat", "Tasty but kinda raw", OBJ_MEAT);
        this.domObject2 = newSpriteDomObject(this.domObject, 50, 2, 10, 18);
        this.cookedForTarget = 1200;
    }
}