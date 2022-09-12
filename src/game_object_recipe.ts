class GameObjectRecipe extends GameObject
{
    name: string;
    containerType: string;
    ingredients: any;
    seasoning: any;
    status: number;
    stars: number;

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

        if (this.seasoning[0] > 0)
        {
            s += "- Add <b>" + this.seasoning[0] + " grams of Chili</b><br/>";
        }

        if (this.seasoning[1] > 0)
        {
            s += "- Add <b>" + this.seasoning[1] + " grams of Pepper</b><br/>";
        }

        s += "- Fry for <b>20 seconds</b><br/>";
        
        if (this.stars)
        {
            s += "<br/>";
            s += "Got <b>" + (this.stars) + "/5 stars";
        }

        return s;
    }

    updateSprite()
    {
        this.domObject.style.filter = (this.status == RECIPE_STATUS_NEW ? "" : "grayscale(1.0)")
    }
}