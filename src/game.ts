class Game
{
	ticks: number;
	time: number;
	maxSpeed: number = 100;
	playerObject: GameObjectPlayer;
	paused: boolean = false;
	objects: Array<GameObject>;
	grabbedObject: GameObject;
	dialogOnStart: Array<any> = null;
	nearestGrabSlot: GameObjectSlot;
	nearestDropSlot: GameObjectSlot;
	nearestObject: GameObject;
	_lastDescription: string = "";
	lastLevelNumber: number;
	recipeToCook: GameObjectRecipe;

	constructor()
	{
		this.ticks = 0;
		this.time = 0;
	}

	loadLevel(n: number)
	{
		this.lastLevelNumber = n;

		_divLayer.innerHTML = "";
		this.objects = [];
		this.grabbedObject = null;
		this.dialogOnStart = null;

		_input.deregisterAction(0);
		_input.deregisterAction(1);
		_input.deregisterAction(2);

		_input.registerAction(2, "Pause", _game.onPauseClick.bind(_game));

		this.objects.push(new GameObjectPlayer(new Vec2D(100, 20)));
		this.playerObject = (this.objects[0] as GameObjectPlayer);

		// TODO: move this somewhere...
		_floorImage = (newElement(_divLayer, "img", "") as HTMLImageElement);
		_floorImage.className = "floor";
		_floorImage.src = GFX_FLOOR;
		_floorImage.width = _z(200);
		_floorImage.height = _z(120);

		switch (n)
		{
			case 0:
				this.objects.push(new GameObjectSlot(new Vec2D(50, 50)));
				this.objects.push(new GameObjectSlot(new Vec2D(100, 50)));
				this.objects.push(new GameObjectSlot(new Vec2D(150, 50)));
				this.objects.push(new GameObjectSlot(new Vec2D(150, 100)));
		
				this.objects.push(new GameObjectSlot(new Vec2D(20, 20)));
				(this.objects[this.objects.length - 1] as GameObjectSlot).setSpawn("meat", 2);
		
				this.objects.push(new GameObjectSlot(new Vec2D(40, 20)));
				(this.objects[this.objects.length - 1] as GameObjectSlot).setSpawn("pan", 3);

				this.objects.push(new GameObjectSlot(new Vec2D(60, 20)));
				(this.objects[this.objects.length - 1] as GameObjectSlot).setSpawn("pot", 3);
		
				this.objects.push(new GameObjectSlotTrash(new Vec2D(80, 20)));
				this.objects.push(new GameObjectSlotChute(new Vec2D(130, 20)));
		
				this.objects.push(new GameObjectCountertop(new Vec2D(80, 80)));
				this.objects.push(new GameObjectCountertop(new Vec2D(90, 80)));
				this.objects.push(new GameObjectCountertop(new Vec2D(100, 80)));
				this.objects.push(new GameObjectCountertop(new Vec2D(110, 80)));
				this.objects.push(new GameObjectCountertop(new Vec2D(120, 80)));
				this.objects.push(new GameObjectCountertop(new Vec2D(110, 90)));
				this.objects.push(new GameObjectCountertop(new Vec2D(110, 100)));
				this.objects.push(new GameObjectCountertop(new Vec2D(110, 110)));

				this.objects.push(new GameObjectRecipe(new Vec2D(20, 80), "Fried foe", "pan", { "meat": 1 }, []));
				this.objects.push(new GameObjectRecipe(new Vec2D(20, 100), "Two fried foes", "pan", { "meat": 2 }, []));
			break;
		
			default:
				_exception("invalid level");
			break;
		}

		if (this.dialogOnStart)
		{
			window.setTimeout(dialogStart.bind(null, this.dialogOnStart), 300);
		}
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

	destroyObjectRecursively(obj: GameObject)
	{
		obj.childObjects.forEach((element: GameObject) => {
			this.destroyObjectRecursively(element);
		});

		obj.onDestroy();
		obj.destroyed = true;
	}

	cleanupDestroyedObjects()
	{
		let i;

		for (i=this.objects.length; i--; i >= 0)
		{
			if (this.objects[i].destroyed)
			{
				this.objects[i].domObject.parentNode.removeChild(this.objects[i].domObject);
				this.objects.splice(i, 1);
			}
		}
	}

	updateDescription()
	{
		let description: string = "";

		if (this.grabbedObject)
		{
			description += this.grabbedObject.getDescription() + "<br/>";
		}

		// TODO: optimize this
		if (this.nearestDropSlot)
		{
			description += "Drop target:<br/>";
			if (this.nearestDropSlot.childObjects.length != 0)
			{
				description += this.nearestDropSlot.childObjects[0].getDescription();
			}
			else
			{
				description += this.nearestDropSlot.getDescription();
			}
			description += "<br/>";
		}
		else if (this.nearestGrabSlot)
		{
			description += "In front of you:<br/>";
			if (this.nearestGrabSlot.childObjects.length != 0)
			{
				description += this.nearestGrabSlot.childObjects[0].getDescription();
			}
			else
			{
				description += this.nearestGrabSlot.getDescription();
			}
			description += "<br/>";
		}
		else if (this.nearestObject)
		{
			description += "In front of you:<br/>";
			description += this.nearestObject.getDescription();
			description += "<br/>";
		}

		let a: GameObjectRecipe = null;
		let b: string = "";

		if (this.grabbedObject instanceof GameObjectContainer && (this.grabbedObject as GameObjectContainer).recipe)
		{
			a = (this.grabbedObject as GameObjectContainer).recipe;
		}
		else if (this.nearestGrabSlot && this.nearestGrabSlot.childObjects.length != 0 && (this.nearestGrabSlot.childObjects[0] instanceof GameObjectContainer) && (this.nearestGrabSlot.childObjects[0] as GameObjectContainer).recipe)
		{
			a = (this.nearestGrabSlot.childObjects[0] as GameObjectContainer).recipe;
		}
		else if (this.nearestDropSlot && this.nearestDropSlot.childObjects.length != 0 && (this.nearestDropSlot.childObjects[0] instanceof GameObjectContainer) && (this.nearestDropSlot.childObjects[0] as GameObjectContainer).recipe)
		{
			a = (this.nearestDropSlot.childObjects[0] as GameObjectContainer).recipe;
		}
		else if (this.recipeToCook)
		{
			a = this.recipeToCook;
			description += "<b>Pick up a pan or pot to start the recipe.</b><br/>";
		}

		if (a)
		{
			b = a.getDescription();
		}


		document.getElementById("recipe").innerHTML = b;

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
		let obj: GameObject;
		let objDistanceMin: number = 9999;
		let canDropHere: boolean;

		for (a of this.objects)
		{
			a.highlighted = false;

			if (a instanceof GameObjectSlot)
			{
				b = dist2d(a.position, this.playerObject.position);
				canDropHere = true;
				
				if (this.grabbedObject)
				{
					if (a.childObjects.length != 0)
					{
						canDropHere = false;
						
						if (a.childObjects[0] instanceof GameObjectContainer && this.grabbedObject instanceof GameObjectIngredient)
						{
							canDropHere = true;
						}
					}
				}

				if (a.childObjects.length != 0 && !this.grabbedObject)
				{
					if (b < grabDistanceMin)
					{
						grabDistanceMin = b;
						grabSlot = a;
					}
				}
				else
				{
					if (canDropHere && b < dropDistanceMin)
					{
						dropDistanceMin = b;
						dropSlot = a;
					}
				}
			}
			else if (a instanceof GameObject && !(a instanceof GameObjectPlayer || a instanceof GameObjectSlot || a instanceof GameObjectCountertop))
			{
				b = dist2d(a.position, this.playerObject.position);
				
				if (b < objDistanceMin)
				{
					objDistanceMin = b;
					obj = a;
				}
			}
		}

		this.nearestGrabSlot = null;
		this.nearestDropSlot = null;
		this.nearestObject = null;

		// TODO: only highlight when interactable

		if (objDistanceMin <= MAX_GRAB_DISTANCE)
		{
			this.nearestObject = obj;
			this.nearestObject.highlighted = true;
		}

		if (grabDistanceMin <= MAX_GRAB_DISTANCE)
		{
			this.nearestGrabSlot = grabSlot;
			this.nearestGrabSlot.highlighted = true;
			if (this.nearestGrabSlot.childObjects.length != 0)
			{
				this.nearestGrabSlot.childObjects[0].highlighted = true;
			}
		}

		if (dropDistanceMin <= MAX_DROP_DISTANCE)
		{
			this.nearestDropSlot = dropSlot;
			this.nearestDropSlot.highlighted = true;
			if (this.nearestDropSlot.childObjects.length != 0)
			{
				this.nearestDropSlot.childObjects[0].highlighted = true;
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
			this.objects.forEach((element) => { element.update(); element.moveAndSlide(delta); element.updateChildObjectsPosition(); });
			// this.sortObjects();

			// TODO: check this alignment
			_divLayer.style.transform = "scale(" + scale + ") perspective(800px) translateY(200px)";
			_divLayer.style.left = (window.innerWidth / 2 - _z(_floorWidth) / 2) + "px";

			_divLayer.style.transformOrigin = (_floorWidth * 0.5 + this.playerObject.position.x) + "px " + (this.playerObject.position.y * 0.5) + "px";

			this.updateGrabDropTargets();
			this.updateActions();
			this.updateDescription();
			this.cleanupDestroyedObjects();
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

	onLightObject()
	{
		(this.nearestGrabSlot.childObjects[0] as GameObjectContainer).isOnFire = true;
	}

	onPauseClick()
	{
		this.setPause(!this.paused, true);
	}

	onReloadLevelClick()
	{
		this.loadLevel(this.lastLevelNumber);
		this.setPause(false);
	}

	onAcceptRecipe()
	{
		if (this.recipeToCook && this.recipeToCook.status == RECIPE_STATUS_ACCEPTED)
		{
			this.recipeToCook.status = RECIPE_STATUS_NEW;
		}
		this.recipeToCook = (this.nearestObject as GameObjectRecipe);
		this.recipeToCook.status = RECIPE_STATUS_ACCEPTED;
	}

	updateActions()
	{
		_input.deregisterAction(0);
		_input.deregisterAction(1);

		if (!this.grabbedObject && this.nearestObject && this.nearestObject instanceof GameObjectRecipe && this.nearestObject.status == RECIPE_STATUS_NEW)
		{
			_input.registerAction(0, 'Accept', this.onAcceptRecipe.bind(this));
		}
		else
		{
			if (this.grabbedObject && this.nearestDropSlot)
			{
				_input.registerAction(0, 'Drop', this.onDropGrabbedObject.bind(this));
			}
			else if (!this.grabbedObject && this.nearestGrabSlot)
			{
				_input.registerAction(0, 'Grab', this.onGrabObject.bind(this));
				if (this.nearestGrabSlot.childObjects.length != 0 && this.nearestGrabSlot.childObjects[0] instanceof GameObjectContainer && !(this.nearestGrabSlot.childObjects[0] as GameObjectContainer).isOnFire)
				{
					_input.registerAction(1, 'Light it', this.onLightObject.bind(this));
				}
			}
		}
	}

	setPause(value: boolean, showMenu: boolean = false)
	{
		this.paused = value;

		if (value && showMenu)
		{
			getObject("overlay").style.display = "block";
		}
		if (!value)
		{
			getObject("overlay").style.display = "none";
		}
	}

	start()
	{
		this.loadLevel(0);
		this.onFrame();
	}
}