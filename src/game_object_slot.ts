class GameObjectSlot extends GameObject
{
    domObject2: HTMLElement;
    domObjectLabel: HTMLElement;
    spawnPoint: boolean = false;
    spawnObjectType: number;
    spawnCount: number;
    spawnLast: GameObject;

    constructor(position: Vec2D)
    {
        super(position, 10, 10, "Slot", "Place stuff here");
        this.domObject2 = newSpriteDomObject(this.domObject, 10, 60, 10, 10);
		this.domObject2.style.transform = "translateY(" + _z(10) + "px) rotateX(90deg)";

        this.domObjectLabel = newDomElement(this.domObject, "div", "c1");

        this.canCatch = true;
        this.stackHeight = 10;
        this.padZ = 15.1;
    }

    updateSprite()
    {
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
                    if (this.spawnObjectType == OBJ_MEAT)
                    {
                        a = new GameObjectMeat(new Vec2D(0, 0));
                    }
                    else if (this.spawnObjectType == OBJ_SHROOM)
                    {
                        a = new GameObjectShroom(new Vec2D(0, 0));
                    }
                    else if (this.spawnObjectType == OBJ_CARROT)
                    {
                        a = new GameObjectCarrot(new Vec2D(0, 0));
                    }
                    else if (this.spawnObjectType == OBJ_PAN)
                    {
                        a = new GameObjectContainerPan(new Vec2D(0, 0));
                    }
                    else if (this.spawnObjectType == OBJ_POT)
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
                    if (_coilActive)
                    {
                        this.spawnCount = 9001;
                    }
                    this.spawnLast = a;
                    this.domObjectLabel.innerHTML = (this.spawnCount != 0 ? ("+" + (this.spawnCount > 9000 ? "&#8734;" : this.spawnCount.toString())) : "");
                }
            }
        }
    }

    setSpawn(objectType: number, count: number)
    {
        this.spawnPoint = true;
        this.spawnObjectType = objectType;
        this.spawnCount = count;
    }
}