class Game
{
	ticks: number;
	time: number;
	maxSpeed: number = 100;
	playerObject: GameObjectPlayer;
	paused: boolean = false;
	objects: Array<GameObject>;
	grabbedObject: GameObject;
	nearestGrabSlot: GameObjectSlot;
	nearestDropSlot: GameObjectSlot;
	_lastDescription: string = "";

	constructor()
	{
		this.objects = [new GameObjectPlayer(new Vec2D(0, 0))];

		this.objects.push(new GameObjectContainer(new Vec2D(0, 0)));
		this.objects.push(new GameObjectSlot(new Vec2D(50, 50)));
		(this.objects[this.objects.length - 1] as GameObjectSlot).catch(this.objects[this.objects.length - 2]);

		this.objects.push(new GameObjectContainer(new Vec2D(0, 50)));
		this.objects.push(new GameObjectSlot(new Vec2D(100, 50)));
		(this.objects[this.objects.length - 1] as GameObjectSlot).catch(this.objects[this.objects.length - 2]);

		this.objects.push(new GameObjectSlot(new Vec2D(150, 50)));
		this.objects.push(new GameObjectSlot(new Vec2D(150, 100)));

		this.ticks = 0;
		this.time = 0;

		this.playerObject = (this.objects[0] as GameObjectPlayer);

		(this.objects[1] as GameObjectContainer).isOnFire = true;
	}

	handleInput()
	{
		let a = _input.getSpeedAndDirection();
		_input.handleActions();
		_input.clearPressedKeys();

		this.playerObject.velocity.x = lerp(this.playerObject.velocity.x, Math.cos(a.direction) * a.speed * this.maxSpeed, 0.3);
		this.playerObject.velocity.y = lerp(this.playerObject.velocity.y, Math.sin(a.direction) * a.speed * this.maxSpeed, 0.3);

		if (_input.xboxGamepadUsedTick > _input.keyboardUsedTick && _input.xboxGamepadUsedTick > _input.psGamepadUsedTick)
		{
			document.body.classList.remove('ah');
			document.body.classList.add('ag');
			document.body.classList.remove('ak');
		}
		else if (_input.psGamepadUsedTick > _input.keyboardUsedTick && _input.psGamepadUsedTick > _input.xboxGamepadUsedTick)
		{
			document.body.classList.add('ah');
			document.body.classList.remove('ag');
			document.body.classList.remove('ak');
		}
		else if (_input.keyboardUsedTick > _input.psGamepadUsedTick && _input.keyboardUsedTick > _input.xboxGamepadUsedTick)
		{
			document.body.classList.remove('ah');
			document.body.classList.remove('ag');
			document.body.classList.add('ak');
		}
	}

	sortObjects()
	{
		(_divLayer.querySelectorAll("div") as any as Array<HTMLElement>).forEach((element: HTMLElement) => {
			element.style.zIndex = Math.floor(element.offsetTop).toString();
		})
	}

	tick()
	{

	}

	updateDescription()
	{
		let description: string = "";

		if (this.grabbedObject)
		{
			description += this.grabbedObject.getDescription();
		}

		// TODO: optimize this
		if (this.nearestDropSlot)
		{
			description += "Drop target:<br/>";
			if (this.nearestDropSlot.occupiedBy)
			{
				description += this.nearestDropSlot.occupiedBy.getDescription();
			}
			else
			{
				description += this.nearestDropSlot.getDescription();
			}
		}
		else if (this.nearestGrabSlot)
		{
			description += "In front of you:<br/>";
			if (this.nearestGrabSlot.occupiedBy)
			{
				description += this.nearestGrabSlot.occupiedBy.getDescription();
			}
			else
			{
				description += this.nearestGrabSlot.getDescription();
			}
		}

		// the browser might modify this after setting so save the latest value
		// to prevent updating every frame
		if (this._lastDescription != description)
		{
			getObject("description").style.display = (description == "" ? "none" : "");
			getObject("description").innerHTML = description;
			this._lastDescription = description;
		}
	}

	updateGrabDropTargets()
	{
		let a: GameObject;
		let b: number;
		let grabSlot: GameObjectSlot;
		let grabDistanceMin: number = 9999;
		let dropSlot: GameObjectSlot;
		let dropDistanceMin: number = 9999;

		for (a of this.objects)
		{
			a.highlighted = false;

			if (a instanceof GameObjectSlot)
			{
				b = dist2d(a.position, this.playerObject.position);

				if (a.occupiedBy)
				{
					if (b < grabDistanceMin)
					{
						grabDistanceMin = b;
						grabSlot = a;
					}
				}
				else
				{
					if (b < dropDistanceMin)
					{
						dropDistanceMin = b;
						dropSlot = a;
					}
				}
			}
		}

		this.nearestGrabSlot = null;
		this.nearestDropSlot = null;

		// TODO: only highlight when interactable

		if (grabDistanceMin <= MAX_GRAB_DISTANCE)
		{
			this.nearestGrabSlot = grabSlot;
			this.nearestGrabSlot.highlighted = true;
			if (this.nearestGrabSlot.occupiedBy)
			{
				this.nearestGrabSlot.occupiedBy.highlighted = true;
			}
		}

		if (dropDistanceMin <= MAX_DROP_DISTANCE)
		{
			this.nearestDropSlot = dropSlot;
			this.nearestDropSlot.highlighted = true;
			if (this.nearestDropSlot.occupiedBy)
			{
				this.nearestDropSlot.occupiedBy.highlighted = true;
			}
		}
	}

	onFrame()
	{
		let delta = 1000/60;

		this.ticks += 1;
		this.time += delta;

		let scale = (window.innerHeight / 1080) * 1.2;

		this.handleInput();
		if (!this.paused)
		{
			this.objects.forEach((element) => { element.update(); element.moveAndSlide(delta); });
			// this.sortObjects();

			// TODO: check this alignment
			_divLayer.style.transform = "scale(" + scale + ") perspective(800px) translateY(200px)";
			_divLayer.style.left = (window.innerWidth / 2 - _z(_floorWidth) / 2) + "px";

			_divLayer.style.transformOrigin = (_floorWidth * 0.5 + this.playerObject.position.x) + "px " + (this.playerObject.position.y * 0.5) + "px";

			this.updateGrabDropTargets();
			this.updateActions();
			this.updateDescription();
		}

		window.requestAnimationFrame(this.onFrame.bind(this));
	}

	onDropGrabbedObject()
	{
		_assert(this.grabbedObject);
		_assert(this.nearestDropSlot);
		
		this.nearestDropSlot.catch(this.grabbedObject)
		this.grabbedObject = null;
	}

	onGrabObject()
	{
		_assert(this.nearestGrabSlot);
		
		this.nearestGrabSlot.giveToPlayer();
	}

	updateActions()
	{
		_input.deregisterAction(0);
		_input.deregisterAction(1);
		if (this.grabbedObject && this.nearestDropSlot)
		{
			_input.registerAction(0, 'Drop', this.onDropGrabbedObject.bind(this));
		}
		else if (!this.grabbedObject && this.nearestGrabSlot)
		{
			_input.registerAction(0, 'Grab', this.onGrabObject.bind(this));
		}
	}

	pause()
	{
		this.paused = true;
	}

	unpause()
	{
		this.paused = false;
	}

	start()
	{
		this.onFrame();
		_input.deregisterAction(0)
		_input.deregisterAction(1)
	}
}