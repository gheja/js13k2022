class GameObjectSlot extends GameObject
{
    domObject2: HTMLElement;
    objectInSlot: GameObject | null = null;

    constructor(position: Vec2D)
    {
        super(position, 10, 10);
        this.domObject2 = newSpriteDomObject(this.domObject, 120, 18, 10, 10);
		this.domObject2.style.transform = "translateY(" + _z(2.5) + "px) rotateX(80deg)";
    }

    updateSprite()
    {
        this.domObject.style.display = (!this.objectInSlot ? "" : "none");

        if (_game.ticks % 30 < 15)
        {
            if (dist2d(this.position, _game.playerObject.position) < 15)
            {
		        this.domObject2.style.opacity = "0.5";
            }
        }
        else
        {
		    this.domObject2.style.opacity = "1";
        }
    }
}