class GameObjectRecipe extends GameObject
{
    name: string;
    containerType: number;
    ingredients: any;
    seasoning: any;
    status: number;
    stars: number;

    constructor(position: Vec2D, name: string, containerType: number, ingredients: any, seasoning: any)
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
        s += "- grab a <b>" + (this.containerType == OBJ_PAN ? "Pan" : "Small Pot") + "</b><br/>";

        // carrot: 30 sec
        // meat: 20 sec
        // shroom: 7 sec

        // I hope ZIP likes repetition...

        if (this.ingredients[OBJ_CARROT])
        {
            s += "- add <b>" + this.ingredients[OBJ_MEAT] + " pcs Carrot</b><br/>";

            if (!this.ingredients[OBJ_MEAT] && !this.ingredients[OBJ_SHROOM])
            {
                s += "- cook for <b>30 seconds</b><br/>";
            }
            else if (this.ingredients[OBJ_MEAT])
            {
                s += "- cook for <b>10 seconds</b><br/>";
            }
            else (this.ingredients[OBJ_SHROOM])
            {
                s += "- cook for <b>23 seconds</b><br/>";
            }
        }

        if (this.ingredients[OBJ_MEAT])
        {
            s += "- add <b>" + this.ingredients[OBJ_MEAT] + " pcs Meat</b><br/>";

            if (!this.ingredients[OBJ_SHROOM])
            {
                s += "- cook for <b>20 seconds</b><br/>";
            }
            else
            {
                s += "- cook for <b>13 seconds</b><br/>";
            }
        }

        if (this.seasoning[0])
        {
            s += "- add <b>" + this.seasoning[0] + " grams of Chili</b><br/>";
        }

        if (this.seasoning[1])
        {
            s += "- add <b>" + this.seasoning[1] + " grams of Pepper</b><br/>";
        }

        if (this.ingredients[OBJ_SHROOM])
        {
            s += "- add <b>" + this.ingredients[OBJ_SHROOM] + " pcs Fire shroom</b><br/>";
            s += "- cook for <b>7 seconds</b><br/>";
        }

        s += "- serve hot<br/>";
      
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