class GameObjectContainer extends GameObject
{
    domObject2: HTMLElement;
    domObjectFire: HTMLElement;
    animationFrame: number;
    isOnFire: boolean = false;
    cookedForTicks: number;
    cookedForTarget: number;

    constructor(position: Vec2D)
    {
        super(position, 10, 10, "Small pot", "A container to fill with ingredients.");
        this.domObject2 = newSpriteDomObject(this.domObject, 0, 18, 10, 10);
        this.domObjectFire = newSpriteDomObject(this.domObject, 0, 0, 10, 10);
        this.animationFrame = Math.floor(Math.random() * 5000);
        this.reset();
    }

    reset()
    {
        this.cookedForTarget = 1000;
        this.childObjects = [];
        this.cookedForTicks = 0;
    }

    onGrabbed()
    {
        this.isOnFire = false;
    }

    getDescriptionExtra()
    {
        if (this.cookedForTicks != 0)
        {
            return "<div class=\"box\">" + (this.isOnFire ? "Cooking... " : "Cooked to ") + Math.round(this.cookedForTicks / this.cookedForTarget * 100) + "%</div>";
        }

        return "";
    }

    updateSprite()
    {
        this.domObjectFire.style.display = (this.isOnFire ? "" : "none");

        if (this.isOnFire)
        {
            this.cookedForTicks++;

            // TODO: optimize this... although zip should be pretty efficient here
            if (this.cookedForTicks == Math.floor(this.cookedForTarget * 0.1))
            {
                emitParticle(this.position.x, this.position.y, 60, 18, 10, 10, "a3", 3000);
            }
            else if (this.cookedForTicks == Math.floor(this.cookedForTarget * 0.7))
            {
                emitParticle(this.position.x, this.position.y, 70, 18, 10, 10, "a3", 3000);
            }
            else if (this.cookedForTicks == Math.floor(this.cookedForTarget * 0.9))
            {
                emitParticle(this.position.x, this.position.y, 80, 18, 10, 10, "a3", 3000);
            }
            else if (this.cookedForTicks == this.cookedForTarget)
            {
                emitParticle(this.position.x, this.position.y, 90, 18, 10, 10, "a3", 3000);
            }
            else if (this.cookedForTicks == Math.floor(this.cookedForTarget * 1.1))
            {
                emitParticle(this.position.x, this.position.y, 100, 18, 10, 10, "a3", 3000);
            }
            else if (this.cookedForTicks == Math.floor(this.cookedForTarget * 1.2))
            {
                emitParticle(this.position.x, this.position.y, 110, 18, 10, 10, "a3", 3000);
            }
        }
        
        if (_game.ticks % 8 == 0)
        {
            this.animationFrame++;
            let a = [ 10, 20, 10, 30, 20, 10, 30 ];
            replaceSpriteDomObject(this.domObjectFire, a[(this.animationFrame) % 7], 18, 10, 10);
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