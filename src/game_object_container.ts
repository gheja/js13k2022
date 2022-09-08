class GameObjectContainer extends GameObject
{
    domObject2: HTMLElement;
    domObjectFire: HTMLElement;
    animationFrame: number;
    isOnFire: boolean = false;
    recipe: GameObjectRecipe;

    constructor(position: Vec2D, width: number, height: number, name: string, description: string, spriteX: number, spriteY: number)
    {
        super(position, width, height, name, description);
        this.domObject2 = newSpriteDomObject(this.domObject, spriteX, spriteY, width, height);
        this.domObjectFire = newSpriteDomObject(this.domObject, 0, 0, 10, 40);
        this.animationFrame = Math.floor(Math.random() * 5000);
        this.reset();
    }

    reset()
    {
        this.childObjects = [];
    }

    getDescriptionExtra()
    {
        if (this.recipe)
        {
            return "<br/>Cooking <b>" + this.recipe.name + "</b>";
        }

        return "";
    }

    onGrabbed()
    {
        if (_game.recipeToCook && _game.recipeToCook.status == RECIPE_STATUS_ACCEPTED)
        {
            this.recipe = _game.recipeToCook;
            _game.recipeToCook.status = RECIPE_STATUS_COOKING;
            _game.recipeToCook = null;
        }

        this.isOnFire = false;
    }

    onDestroy()
    {
        if (this.recipe && this.recipe.status == RECIPE_STATUS_COOKING)
        {
            this.recipe.status = RECIPE_STATUS_NEW;
        }
    }

    updateSprite()
    {
        this.domObjectFire.style.display = (this.isOnFire ? "" : "none");

        if (this.isOnFire)
        {
            this.cook();
        }
        
        if (_game.ticks % 8 == 0)
        {
            this.animationFrame++;
            let a = [ 10, 20, 10, 30, 20, 10, 30 ];
            replaceSpriteDomObject(this.domObjectFire, a[(this.animationFrame) % 7], 40, 10, 10);
        }

        // warning
        /*
        if (_game.ticks % 20 < 10)
        {
            this.domObject.style.filter = "brightness(2)";
        }
        else if (_game.ticks % 20 < 20)
        {
            this.domObject.style.filter = "brightness(0.8)";
        }
        else
        {
            this.domObject.style.filter = "";
        }
        */
   }
}