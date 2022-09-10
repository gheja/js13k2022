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

    catch(obj: GameObject): boolean
    {
        if (!_game.evaluate())
        {
            // something is not right...
            return false;
        }

        if (obj instanceof GameObjectContainer && (obj as GameObjectContainer).recipe)
        {
            (obj as GameObjectContainer).recipe.status = RECIPE_STATUS_DONE;
        }
        
        _game.destroyObjectRecursively(obj);

        return true;
    }
}