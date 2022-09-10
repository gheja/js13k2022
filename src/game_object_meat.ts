class GameObjectMeat extends GameObjectIngredient
{
    domObject2: HTMLElement;

    constructor(position: Vec2D)
    {
        super(position, 10, 18, "Meat", "Some tasty meat, kinda raw though.", OBJ_MEAT);
        this.domObject2 = newSpriteDomObject(this.domObject, 50, 2, 10, 18);
        this.cookedForTarget = 1200;
    }
}