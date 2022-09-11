class GameObject
{
	position: Vec2D;
	velocity: Vec2D;
	domObject: HTMLElement;
	interactable: boolean = false;
	domTransformExtra: string = "";
	width: number;
	height: number;
	highlighted: boolean = false;
	name: string;
	description: string;
	parentObject: GameObject;
	childObjects: Array<GameObject> = [];
	destroyed: boolean = false;
	collidable: boolean = false;
	objectType: number;

	cookedForTicks: number = 0;
	cookedForTarget: number = 0;

	canCatch: boolean = false;

	constructor(position: Vec2D, width: number, height: number, name: string, description: string, objectType: number = OBJ_UNDEFINED)
	{
		this.domObject = newDomElement(_divLayer, "div", "o");
		this.domObject.style.width = width + "px";
		this.domObject.style.height = height + "px";
		this.position = new Vec2D();
		this.position.copyFrom(position);
		this.velocity = new Vec2D();
		this.name = name;
		this.description = description;
		this.objectType = objectType;

		this.width = width;
		this.height = height;
	}

	catch(obj: GameObject): boolean
    {
		// if this already has an object and it is a container then give the
		// "obj" to that container
		if (this.childObjects.length != 0 && this.childObjects[0] instanceof GameObjectContainer)
		{
			this.childObjects[0].catch(obj);
		}
		else
		{
			obj.parentObject = this;
			this.childObjects.push(obj);
			obj.position.copyFrom(this.position);
		}

		return true;
    }

    giveToPlayer()
    {
        _game.grabbedObject = this.childObjects[0];
		this.childObjects[0].parentObject = null;
		this.childObjects[0].onGrabbed();
        this.childObjects.pop();
    }

	cook()
	{
		this.childObjects.forEach(element => {
			element.cook();
		});
		
		if (this.cookedForTarget != 0)
		{
			this.onCook();
		}
	}

	onCook()
	{
		if (na() && this.cookedForTicks == this.cookedForTarget)
		{
			// can't cook it more than that
			return;
		}
		
		this.cookedForTicks++;

		// TODO: optimize this... although zip should be pretty efficient here
		if (this.cookedForTicks == Math.floor(this.cookedForTarget * 0.1))
		{
			emitParticle(this.position.x, this.position.y, 0, 50, 10, 10, "a3", 3000);
			playSound(SOUND_BLIP);
		}
		else if (this.cookedForTicks == Math.floor(this.cookedForTarget * 0.7))
		{
			emitParticle(this.position.x, this.position.y, 10, 50, 10, 10, "a3", 3000);
			playSound(SOUND_BLIP);
		}
		else if (this.cookedForTicks == Math.floor(this.cookedForTarget * 0.9))
		{
			emitParticle(this.position.x, this.position.y, 20, 50, 10, 10, "a3", 3000);
			playSound(SOUND_BLIP);
		}
		else if (this.cookedForTicks == this.cookedForTarget)
		{
			emitParticle(this.position.x, this.position.y, 30, 50, 10, 10, "a3", 3000);
			playSound(SOUND_BLIP);
		}
		else if (this.cookedForTicks == Math.floor(this.cookedForTarget * 1.1))
		{
			emitParticle(this.position.x, this.position.y, 40, 50, 10, 10, "a3", 3000);
			playSound(SOUND_BLIP);
		}
		else if (this.cookedForTicks == Math.floor(this.cookedForTarget * 1.2))
		{
			emitParticle(this.position.x, this.position.y, 50, 50, 10, 10, "a3", 3000);
			playSound(SOUND_BLIP);
		}
	}

	onGrabbed()
	{

	}

	onDestroy()
	{
		
	}

	getDescription()
	{
		let s = "<b>" + this.name + "</b><br/>" + this.description;

		if (this.childObjects.length != 0)
		{
			s += "<div class=\"box\">Contains:<br/>";

			this.childObjects.forEach(element => {
				s += "&nbsp;- " + element.name;

				if (element.cookedForTarget != 0)
				{
					s += " (cooked to " +
						Math.round(element.cookedForTicks / element.cookedForTarget * 100) + "%, " +
						(element.cookedForTarget >= element.cookedForTicks ? _ticksToSeconds(element.cookedForTarget - element.cookedForTicks) + "s left" : "overcooked") +
						")";
				}

				s += "<br/>";
			});

			s += "</div>";
		}

		return s + this.getDescriptionExtra();
	}

	getDescriptionExtra()
	{
		return "";
	}

	getIsGrabbed()
	{
		if (this == _game.grabbedObject)
		{
			return true;
		}

		if (this.parentObject)
		{
			return this.parentObject.getIsGrabbed();
		}

		return false;
	}

	calculateCollision()
	{

	}

	moveAndSlide(delta: number)
	{
		// hello godot

		if (!(this instanceof GameObjectPlayer))
		{
			return;
		}

		let canMove = true;
		let targetPosition = new Vec2D(0, 0);
		targetPosition.x = this.position.x + this.velocity.x * (delta/1000);
		targetPosition.y = this.position.y + this.velocity.y * (delta/1000);

		_game.objects.forEach(element => {
			if (element.collidable)
			{
				if (pointInBox(targetPosition, element.position, 10, 10, ((element as GameObjectWall).repeatWidth * 10), 10))
				{
					canMove = false;
				}
			}
		});

		// hard-coded boundaries
		if (targetPosition.x < -94 || targetPosition.x > 240 || targetPosition.y < -600 || targetPosition.y > 137)
		{
			canMove = false;
		}

		if (canMove)
		{
			this.position.copyFrom(targetPosition);
		}
		else
		{
			// a tiny kickback so won't stuck
			let a:Vec2D = new Vec2D(0, 0);
			a.copyFrom(targetPosition);
			a.subtract(this.position)
			a.normalize();

			this.position.x -= a.x * 0.1;
			this.position.y -= a.y * 0.1;

			// and stop
			this.velocity.zero();
		}
	}

	updateChildObjectsPosition()
	{
		this.childObjects.forEach(element => {
			element.position.copyFrom(this.position)
			element.updateChildObjectsPosition()
		});
	}

	updateSprite()
	{

	}

	updateHighlight()
	{
        if (_game.ticks % 20 < 10)
        {
            if (this.highlighted)
            {
		        this.domObject.style.opacity = "0.5";
            }
        }
        else
        {
		    this.domObject.style.opacity = "1";
        }
	}

	update()
	{
		let grabbed2 = 0;

		if (_game.grabbedObject == this)
		{
			this.position.copyFrom(_game.playerObject.position);
			this.position.y += 0.2;
			grabbed2 = 5;
		}

		this.updateSprite();
		this.updateHighlight();
		this.domObject.style.transform = "translateX(" + _z(this.position.x) + "px) translateY(" + _z(_floorHeight / 2 - this.height - grabbed2) + "px) translateZ(" + _z(this.position.y) + "px) " + this.domTransformExtra;
	}
}