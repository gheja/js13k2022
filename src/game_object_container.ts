class GameObjectContainer extends GameObject
{
    domObject2: HTMLElement;
    domObjectFire: HTMLElement;
    animationFrame: number;
    isOnFire: boolean = false;
    recipe: GameObjectRecipe;

    constructor(position: Vec2D, width: number, height: number, name: string, description: string, spriteX: number, spriteY: number, objectType: number)
    {
        super(position, width, height, name, description, objectType);
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
            return "Cooking <b>" + this.recipe.name + "</b>";
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

    evaluate()
    {
        _assert(this.recipe);

        let stars = 5;
        let i: number;
        let j: number;
        let n: number;

        let alreadyDone = false;
        let emptyDish = false;
        let countMissing = 0;
        let countExtra = 0;
        let countRaw = 0;
        let countUndercooked = 0;
        let countOvercooked = 0;
        let countPerfect = 0;

        // // TODO: fix this! status is reset to ACCEPTED on grab
        // alreadyDone = (this.recipe.status == RECIPE_STATUS_DONE);

        // NOTE: skipping alreadyDone check to give a chance to fix the mistake
        // (the rest of this will be optimized out as this is always false)
        alreadyDone = false;
        emptyDish = (this.childObjects.length == 0);

        for (i=OBJ_INGREDIENT_FIRST; i<OBJ_INGREDIENT_LAST + 1; i++)
        {
            n = 0;
            this.childObjects.forEach(element => {
                if (element.objectType == i)
                {
                    n++;
                }
            });

            if (this.recipe.ingredients[i] > n)
            {
                // was missing at least one of this type of ingredient
                countMissing++;
            }

            if (this.recipe.ingredients[i] < n)
            {
                // was more than expected at least one of this type of ingredient
                countExtra++;
            }
        }

        this.childObjects.forEach(element => {
            let cookPercent: number;

            _assert(element.cookedForTarget != 0);

            cookPercent = element.cookedForTicks / element.cookedForTarget;

            if (cookPercent < 0.5)
            {
                countRaw++;
            }
            else if (cookPercent > 0.98 && cookPercent < 1.02)
            {
                countPerfect++;
            }
            else if (cookPercent < 0.8)
            {
                countUndercooked++;
            }
            else if (cookPercent > 1.2)
            {
                countOvercooked++;
            }
        });


        if (emptyDish)
        {
            stars = 1;
        }
        else
        {
            stars = 5 - countMissing * 2 - countExtra * 1 - countRaw * 2 - countUndercooked * 0.5 - countOvercooked * 0.5 + countPerfect * 1;
        }

        console.log([ emptyDish, countMissing, countExtra, countRaw, countUndercooked, countOvercooked, countPerfect ]);
        console.log(stars);

        stars = clamp(1, 5, stars);


        let s: string = "";
        let s1: string;
        let problems: Array<string> = [];

        if (stars == 1)
        {
            s1 = "I won't comment this one";
        }
        else
        {
            if (countRaw > 0)
            {
                problems.push("something was raw");
            }

            if (countMissing > 0)
            {
                problems.push("something was missing");
            }

            if (countExtra > 0)
            {
                problems.push("I got more of something");
            }

            if (countUndercooked > 0)
            {
                problems.push("something was a bit underdone");
            }

            if (countOvercooked > 0)
            {
                problems.push("something was overdone");
            }

            if (alreadyDone)
            {
                problems.push("I got this earlier");
            }

            if (stars >= 4.5)
            {
                s1 = "I loved it";

                if (problems.length == 0 && countPerfect > 0)
                {
                    s1 = "It was perfect";
                }
            }
            else if (stars >= 3)
            {
                s1 = "It was nice";
            }
            else
            {
                s1 = "Thanks";
            }

        }
        
        s = s1;

        if (problems.length > 0)
        {
            s += ", although ";
            s += problems.join(" and ");
        }

        s += ". " + (stars) + "/5 stars";

        this.recipe.stars = stars;

        statsIncrease(STATS_STARS_COLLECTED, stars);
        
        // NOTE: if (alreadyDone), don't count to score!

        dialogStart([[ 1, 1, s ]]);
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