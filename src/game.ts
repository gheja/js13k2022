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
	onDialogEnd: any = null;
	nearestGrabTarget: GameObject;
	nearestDropTarget: GameObject;
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
		this.onDialogEnd = null;

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
				this.objects.push(new GameObjectDeputy(new Vec2D(90, 10)));

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

				this.dialogOnStart = [
					[ 3, 1, "Hey Boss!" ],
					[ 3, 1, "It's been a while. How do you do?" ],
					[ 0, 2, "Hey Goblin! All fine, thanks. I need to cook for Skully, do we have pans around?" ],
					[ 3, 1, "Sure we have! Just pick up the recipe first." ],
					[ 3, 1, "I'll be here if you need any help." ],
					[ 0, 2, "That won't be necessary but thanks." ],
				];
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

	loadNextLevel()
	{
		this.loadLevel(this.lastLevelNumber + 1);
	}

	loadNextLevelDelayed()
	{
		window.setTimeout(this.loadNextLevel.bind(this), 300);
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
		if (this.nearestDropTarget)
		{
			description += "Drop target:<br/>";
			if (this.nearestDropTarget.childObjects.length != 0)
			{
				description += this.nearestDropTarget.childObjects[0].getDescription();
			}
			else
			{
				description += this.nearestDropTarget.getDescription();
			}
			description += "<br/>";
		}
		else if (this.nearestGrabTarget)
		{
			description += "In front of you:<br/>";
			if (this.nearestGrabTarget.childObjects.length != 0)
			{
				description += this.nearestGrabTarget.childObjects[0].getDescription();
			}
			else
			{
				description += this.nearestGrabTarget.getDescription();
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
		else if (this.nearestGrabTarget && this.nearestGrabTarget.childObjects.length != 0 && (this.nearestGrabTarget.childObjects[0] instanceof GameObjectContainer) && (this.nearestGrabTarget.childObjects[0] as GameObjectContainer).recipe)
		{
			a = (this.nearestGrabTarget.childObjects[0] as GameObjectContainer).recipe;
		}
		else if (this.nearestDropTarget && this.nearestDropTarget.childObjects.length != 0 && (this.nearestDropTarget.childObjects[0] instanceof GameObjectContainer) && (this.nearestDropTarget.childObjects[0] as GameObjectContainer).recipe)
		{
			a = (this.nearestDropTarget.childObjects[0] as GameObjectContainer).recipe;
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
		let grabSlot: GameObject;
		let grabDistanceMin: number = 9999;
		let dropSlot: GameObject;
		let dropDistanceMin: number = 9999;
		let obj: GameObject;
		let objDistanceMin: number = 9999;
		let canDropHere: boolean;

		for (a of this.objects)
		{
			a.highlighted = false;

			if (a.canCatch)
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

		this.nearestGrabTarget = null;
		this.nearestDropTarget = null;
		this.nearestObject = null;

		// TODO: only highlight when interactable

		if (objDistanceMin <= MAX_GRAB_DISTANCE && !obj.getIsGrabbed())
		{
			this.nearestObject = obj;
			this.nearestObject.highlighted = true;
		}

		if (grabDistanceMin <= MAX_GRAB_DISTANCE)
		{
			this.nearestGrabTarget = grabSlot;
			this.nearestGrabTarget.highlighted = true;
			if (this.nearestGrabTarget.childObjects.length != 0)
			{
				this.nearestGrabTarget.childObjects[0].highlighted = true;
			}
		}

		if (dropDistanceMin <= MAX_DROP_DISTANCE)
		{
			this.nearestDropTarget = dropSlot;
			this.nearestDropTarget.highlighted = true;
			if (this.nearestDropTarget.childObjects.length != 0)
			{
				this.nearestDropTarget.childObjects[0].highlighted = true;
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
		_assert(this.nearestDropTarget);
		
		this.nearestDropTarget.catch(this.grabbedObject)
		this.grabbedObject = null;
	}

	onGrabObject()
	{
		_assert(this.nearestGrabTarget);

		this.nearestGrabTarget.giveToPlayer();
	}

	onLightObject()
	{
		(this.nearestGrabTarget.childObjects[0] as GameObjectContainer).isOnFire = true;
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
			if (this.grabbedObject && this.nearestDropTarget)
			{
				_input.registerAction(0, 'Drop', this.onDropGrabbedObject.bind(this));
			}
			else if (!this.grabbedObject && this.nearestGrabTarget)
			{
				_input.registerAction(0, 'Grab', this.onGrabObject.bind(this));
				if (this.nearestGrabTarget.childObjects.length != 0 && this.nearestGrabTarget.childObjects[0] instanceof GameObjectContainer && !(this.nearestGrabTarget.childObjects[0] as GameObjectContainer).isOnFire)
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