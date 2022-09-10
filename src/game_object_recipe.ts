class GameObjectRecipe extends GameObject
{
    name: string;
    containerType: string;
    ingredients: any;
    seasoning: any;
    status: number;

    constructor(position: Vec2D, name: string, containerType: string, ingredients: any, seasoning: any)
    {
        super(position, 10, 10, name, "A recipe to cook.");

        this.containerType = containerType;
        this.ingredients = ingredients;
        this.seasoning = seasoning;

        replaceSpriteDomObject(this.domObject, 0, 70, 10, 10);

        this.status = RECIPE_STATUS_NEW;
    }

    getDescriptionExtra()
    {
        let s: string = "";

        s += "<br/>";
        s += "- Grab a <b>" + (this.containerType == "pan" ? "Pan" : "Small Pot") + "</b><br/>";
        s += "- Add <b>" + this.ingredients[OBJ_MEAT] + " pcs Meat</b><br/>";
        s += "- Fry for <b>20 seconds</b><br/>";

        return s;
    }

    updateSprite()
    {
        this.domObject.style.filter = (this.status == RECIPE_STATUS_NEW ? "" : "grayscale(1.0)")
    }
}