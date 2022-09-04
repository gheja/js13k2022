class GameObjectSlot extends GameObject
{
    domObject2: HTMLElement;
    occupiedBy: GameObject | null = null;

    constructor(position: Vec2D)
    {
        super(position, 10, 10);
        this.domObject2 = newSpriteDomObject(this.domObject, 120, 18, 10, 10);
		this.domObject2.style.transform = "translateY(" + _z(2.5) + "px) rotateX(80deg)";
    }

    catch(obj: GameObject)
    {
        this.occupiedBy = obj;
        obj.position.copyFrom(this.position);
    }

    giveToPlayer()
    {
        _game.grabbedObject = this.occupiedBy;
        this.occupiedBy = null;
    }

    updateSprite()
    {
        this.domObject.style.display = (!this.occupiedBy ? "" : "none");
    }
}