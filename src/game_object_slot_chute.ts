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

        dialogStart([[ 1, 1, "Oh nice!" ], [ 1, 1, "It is a bit raw, though... 4/5 stars. (But this is just a dummy text.)" ]]);

        if (obj instanceof GameObjectContainer && (obj as GameObjectContainer).recipe)
        {
            (obj as GameObjectContainer).recipe.status = RECIPE_STATUS_DONE;
        }
        
        _game.destroyObjectRecursively(obj);
    }
}