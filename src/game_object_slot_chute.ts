class GameObjectSlotChute extends GameObjectSlot
{
    domObject2: HTMLElement;
    domObjectLabel: HTMLElement;

    constructor(position: Vec2D)
    {
        super(position);
        this.name = "Chute";
        this.description = "Place the finished food here.";
        this.domObjectLabel.innerHTML = "Ready!";
    }

    catch(obj: GameObject)
    {
        // TODO: evaulate points
        _game.destroyObjectRecursively(obj);
    }
}