class GameObjectSlotTrash extends GameObjectSlot
{
    domObject2: HTMLElement;
    domObjectLabel: HTMLElement;

    constructor(position: Vec2D)
    {
        super(position);
        
        replaceSpriteDomObject(this.domObject, 40, 60, 10, 10);

        this.name = "Trash can";
        this.description = "Just a trash can.";
        this.domObjectLabel.innerHTML = "Trash";
    }

    catch(obj: GameObject)
    {
        _game.destroyObjectRecursively(obj);
        emitParticle(this.position.x, this.position.y, 10, 40, 10, 10, "dust2", 400);
    }
}