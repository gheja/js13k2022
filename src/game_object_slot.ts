class GameObjectSlot extends GameObject
{
    domObject2: HTMLElement;
    domObjectLabel: HTMLElement;
    spawnPoint: boolean = false;
    spawnObjectType: string;
    spawnCount: number;
    spawnLast: GameObject;

    constructor(position: Vec2D)
    {
        super(position, 10, 10, "Slot", "A place where you can place stuffs.");
        this.domObject2 = newSpriteDomObject(this.domObject, 120, 18, 10, 10);
		this.domObject2.style.transform = "translateY(" + _z(5) + "px) rotateX(90deg)";

        this.domObjectLabel = newElement(this.domObject, "div", "c1");
    }

    updateSprite()
    {
        this.domObject2.style.display = (this.childObjects.length != 0 ? "none" : "");

        if (this.spawnPoint)
        {
            if (this.spawnCount > 0)
            {
                if ((this.childObjects.length != 0 && this.childObjects[0] == this.spawnLast) || (_game.grabbedObject && _game.grabbedObject == this.spawnLast))
                {
                    // skip as it is still in this slot or in the hands of the player
                }
                else
                {
                    let a: GameObject;

                    // structuredClone() fails so...
                    if (this.spawnObjectType == "meat")
                    {
                        a = new GameObjectMeat(new Vec2D(0, 0));
                    }
                    else if (this.spawnObjectType == "pan")
                    {
                        a = new GameObjectContainerPan(new Vec2D(0, 0));
                    }
                    else if (this.spawnObjectType == "pot")
                    {
                        a = new GameObjectContainerPot(new Vec2D(0, 0));
                    }
                    else
                    {
                        _exception("Invalid spawnObjectType.");
                    }
                    _game.objects.push(a);
                    this.catch(a);
                    this.spawnCount--;
                    this.spawnLast = a;
                    this.domObjectLabel.innerHTML = (this.spawnCount != 0 ? ("+" + this.spawnCount.toString()) : "");
                }
            }
        }
    }

    setSpawn(objectType: string, count: number)
    {
        this.spawnPoint = true;
        this.spawnObjectType = objectType;
        this.spawnCount = count;
    }
}