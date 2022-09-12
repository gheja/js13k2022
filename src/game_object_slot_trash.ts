class GameObjectSlotTrash extends GameObjectSlot
{
    domObject2: HTMLElement;
    domObjectLabel: HTMLElement;

    constructor(position: Vec2D)
    {
        super(position);
        
        replaceSpriteDomObject(this.domObject, 20, 0, 20, 20);

        this.name = "Cerberos";
        this.description = "A sweet pup with three heads and a few endless stomachs.";
        // this.domObjectLabel.innerHTML = "Trash";
        this.domObject2.parentNode.removeChild(this.domObject2);
        this.width = 20;
        this.height = 20;
        this.domObject.style.width = _z(this.width) + "px";
		this.domObject.style.height = _z(this.height) + "px";
        this.padZ = 0;
    }

    catch(obj: GameObject): boolean
    {
        _game.destroyObjectRecursively(obj);
        emitParticle(this.position.x, this.position.y, 10, 40, 10, 10, "dust2", 400);

        return true;
    }
}