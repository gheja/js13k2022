class Game
{
	ticks: number;
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
	lastLevelNumber: number;
	recipeToCook: GameObjectRecipe;
	welcomePaused: boolean = false;
	levelFinished: boolean;
	levelFinishSaid: boolean = false;
	pats: number = 0;

	constructor()
	{
		this.ticks = 0;
	}

	loadLevel(n: number)
	{
		let stock: Array<number> = [];
		let recipes: Array<any> = [];

		// end the transition effect
		getDomElement("f1").classList.remove("w");
		getDomElement("f2").classList.remove("w");

		this.lastLevelNumber = n;
		if (n > 1)
		{
			saveLevelNumber(n);
		}

		// TODO: optimize?

		// #l0 - layer 0 - transform base
		// #l1 - layer 1 - lava
		// #l2 - layer 2 - rocks
		// #l3 - layer 3 - fog
		_divLayer.innerHTML = "<div id=\"l0\">" + (_isMobile ? "" : "<div id=\"l1\"></div>") + "<div id=\"l2\"></div><div id=\"l3\"></div>" + (n > 1 ? "<div id=\"l4\"></div>" : "") + "</div>";
		this.objects = [];
		this.grabbedObject = null;
		this.dialogOnStart = null;
		this.onDialogEnd = null;
		this.paused = false;
		this.levelFinished = false;

		_input.deregisterAction(0);
		_input.deregisterAction(1);
		_input.deregisterAction(2);

		_input.registerAction(2, "Pause", _game.onPauseClick.bind(_game));

		this.objects.push(new GameObjectPlayer(new Vec2D(170, 100)));

		if (n > 1)
		{
			this.objects.push(new GameObjectDeputy(new Vec2D(170, 50)));

			this.objects.push(new GameObjectWall(new Vec2D(0, 0), 14, 1, 2));
			this.objects.push(new GameObjectWall(new Vec2D(140, 0), 3, 1, 1));
			this.objects.push(new GameObjectWall(new Vec2D(170, 0), 3, 1, 2));
			this.objects.push(new GameObjectWall(new Vec2D(0, 120), 20, 1, 1));
			this.objects.push(new GameObjectWall(new Vec2D(0, 110)));
			this.objects.push(new GameObjectWall(new Vec2D(190, 110)));

			this.objects.push(new GameObjectSlot(new Vec2D(90, 80)));
			this.objects.push(new GameObjectSlot(new Vec2D(110, 80)));
			this.objects.push(new GameObjectSlot(new Vec2D(130, 80)));
			this.objects.push(new GameObjectSlot(new Vec2D(110, 100)));

			// ingredients, seasoning, etc.
			this.objects.push(new GameObjectCountertop(new Vec2D(10, 10), 11, 1, 1));

			this.objects.push(new GameObjectCountertop(new Vec2D(140, 10), 3, 1, 1));
			this.objects.push(new GameObjectSlotChute(new Vec2D(150, 10)));

			this.objects.push(new GameObjectCountertop(new Vec2D(80, 80), 7, 1, 1));
			this.objects.push(new GameObjectCountertop(new Vec2D(110, 90)));
			this.objects.push(new GameObjectCountertop(new Vec2D(110, 100)));
			this.objects.push(new GameObjectCountertop(new Vec2D(110, 110)));
		}

		if (n > 2)
		{
			// hello, Cerberos
			this.objects.push(new GameObjectSlotTrash(new Vec2D(180, 10)));
		}

		if (n > 3)
		{
			this.objects.push(new GameObjectSlot(new Vec2D(110, 10)));
			this.objects.push(new GameObjectSeasoning(new Vec2D(110, 10)));
			this.objects[this.objects.length - 2].catch(this.objects[this.objects.length - 1]);
		}

		this.playerObject = (this.objects[0] as GameObjectPlayer);

		switch (n)
		{
			// a dummy level for the welcome screen
			case 0:
			break;

			case 1:
				this.dialogOnStart = [
					[ 0, 2, "Ahh... what a wonderful day!" ],
					[ 0, 2, "The temperature is sweet, the weather is just perfect...", 1 ],
					[ 0, 2, "A really wonderful day!", 1 ],
					[ 0, 2, "*sigh* I am bored.", 1 ],
					[ 2, 2, "*ring-ring*", 1 ],
					[ 0, 2, "Hello, Devil speaking!" ],
					[ 1, 1, "Hey Dev, this is Skully!" ],
					[ 0, 2, "Death, what a nice surprise! How's it going?" ],
					[ 1, 1, "Great, great. Listen. By any chance..." ],
					[ 1, 1, "Is that restaurant of yours still around?" ],
					[ 0, 2, "Yeah, it is. But--" ],
					[ 1, 1, "Great! So I'll have a party tonight with friends and we want to have something delicious and thought you could help out!" ],
					[ 0, 2, "Sure, but--" ],
					[ 1, 1, "Thanks, I'll send some meat over, you're the best!" ],
					[ 2, 2, "*click*" ],
					[ 0, 2, "I better get going...", 1 ],
				];
				this.onDialogEnd = this.loadNextLevelDelayed.bind(this);
			break;

			case 2:
				// meat, shroom, carrot, pan, pot
				stock = [ 0, 2, 0, 0, 3 ];
				recipes = [
					[ "Fried foe", OBJ_PAN, [ 0, 1 ], [ 0, 0 ] ]
				];

				this.dialogOnStart = [
					[ 3, 1, "Hey Boss!" ],
					[ 3, 1, "It's been a while. How do you do?" ],
					[ 0, 2, "Hey Goblin! All fine, thanks. I need to cook for Skully, do we have pans around?" ],
					[ 3, 1, "Sure we have! Just pick up the recipe first." ],
					[ 3, 1, "And don't worry they still love to be cooked." ],
					[ 3, 1, "Just don't burn them....", 1 ],
				];
			break;

			case 3:
				// meat, shroom, carrot, pan, pot
				stock = [ 0, 4, 0, 0, 3 ];
				recipes = [
					[ "Fried foe", OBJ_PAN, [ 0, 1 ], [ 0, 0 ] ],
					[ "Fried foe", OBJ_PAN, [ 0, 1 ], [ 0, 0 ] ]
				];

				this.dialogOnStart = [
					[ 3, 1, "Hey Boss!" ],
					[ 3, 1, "Skully called and wants more of those." ],
				];
			break;

			case 4:
				// meat, shroom, carrot, pan, pot
				stock = [ 0, 4, 0, 0, 3 ];
				recipes = [
					[ "Spicy fried friends", OBJ_PAN, [ 0, 2 ], [ 10, 0 ] ],
				];

				this.dialogOnStart = [
					[ 3, 1, "Hey Boss!" ],
					[ 3, 1, "Look who came by! Your favorite three-in-one pup, Cerberos!" ],
					[ 3, 1, "He looks hungry, I guess he can help you out with leftovers." ],
					[ 3, 1, "I also got a bit of chili and pepper." ],
				];
			break;

			case 5:
				// meat, shroom, carrot, pan, pot
				stock = [ 0, 2, 0, 4, 3 ];
				recipes = [
					[ "Fred and vegs", OBJ_PAN, [ 0, 1, 0, 2 ], [ 0, 5 ] ],
				];

				this.dialogOnStart = [
					[ 3, 1, "Hey Boss!" ],
					[ 3, 1, "I found some stuff in the fridge." ],
					[ 3, 1, "Might come handy." ],
				];
			break;

			case 6:
				// meat, shroom, carrot, pan, pot
				stock = [ 0, 2, 0, 3, 3, 3 ];
				recipes = [
					[ "Carrot soup", OBJ_POT, [ 0, 0, 0, 3 ], [ 0, 5 ] ],
					[ "Fried foe",   OBJ_PAN, [ 0, 1       ], [ 0, 0 ] ]
				];

				this.dialogOnStart = [
					[ 3, 1, "Hey Boss!" ],
					[ 3, 1, "I just got our pot back." ],
				];
			break;

			case 7:
				// meat, shroom, carrot, pan, pot
				stock = [ 0, 1, 3, 3, 3, 3 ];
				recipes = [
					[ "Super soupper", OBJ_POT, [ 0, 0, 2, 2 ], [ 5, 15 ] ],
					[ "Fried foe",     OBJ_PAN, [ 0, 1       ], [ 0,  0 ] ]
				];

				this.dialogOnStart = [
					[ 3, 1, "Hey Boss!" ],
					[ 3, 1, "Another dinner for two?" ],
					[ 3, 1, "Erm... not us. Of course.", 1 ],
				];
			break;

			case 8:
				// meat, shroom, carrot, pan, pot
				stock = [ 0, 4, 3, 3, 3, 3 ];
				recipes = [
					[ "Fred and vegs",       OBJ_PAN, [ 0, 1, 0, 2 ], [ 0,  5 ] ],
					[ "Spicy fried friends", OBJ_PAN, [ 0, 2       ], [ 10, 0 ] ],
					[ "All in!",             OBJ_POT, [ 0, 1, 1, 1 ], [ 10, 5 ] ],
				];

				this.dialogOnStart = [
					[ 3, 1, "Hey Boss!" ],
					[ 3, 1, "Skully called and..." ],
				];
			break;

			case 9:
				// meat, shroom, carrot, pan, pot
				stock = [ 0, 3, 3, 3, 4, 4 ];
				recipes = [
					[ "Spicy fried friends", OBJ_PAN, [ 0, 2 ], [ 10, 0 ] ],
				];
				this.dialogOnStart = [
					[ 3, 1, "Hey Boss!" ],
					[ 3, 1, "(last level)" ],
				];
			break;
		
			default:
				_exception("invalid level");
			break;
		}

		let i;

		for (i=0; i<6; i++)
		{
			if (stock[i])
			{
				this.objects.push(new GameObjectSlot(new Vec2D(10 + (i-1) * 20, 10)));
				(this.objects[this.objects.length - 1] as GameObjectSlot).setSpawn(i, stock[i]);
			}
		}

		for (i=0;i<recipes.length;i++)
		{
			this.objects.push(new GameObjectRecipe(new Vec2D(20, 80 - i * 10), recipes[i][0], recipes[i][1], recipes[i][2], recipes[i][3]));
		}

		if (this.dialogOnStart)
		{
			window.setTimeout(dialogStart.bind(null, this.dialogOnStart), 1000);
		}

		if (n >= FIRST_LEVEL_NUMBER)
		{
			statsIncrease(STATS_LEVELS_STARTED, 1);
		}
	}

	loadNextLevel()
	{
		getDomElement("f1").classList.add("w");
		getDomElement("f2").classList.add("w");
		window.setTimeout(this.loadLevel.bind(this, this.lastLevelNumber + 1), 500);
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
		

		// -- description

		if (this.grabbedObject)
		{
			description += "Carrying:<br/>";
			description += "<div class=\"box\">";
			description += this.grabbedObject.getDescription();
			description += "</div>";
		}

		// TODO: optimize this
		if (this.nearestDropTarget)
		{
			description += "Drop target:";
			description += "<div class=\"box\">";
			if (this.nearestDropTarget.childObjects.length != 0)
			{
				description += this.nearestDropTarget.childObjects[0].getDescription();
			}
			else
			{
				description += this.nearestDropTarget.getDescription();
			}
			description += "</div>";
		}
		else if (this.nearestGrabTarget)
		{
			description += "In front of you:";
			description += "<div class=\"box\">";
			if (this.nearestGrabTarget.childObjects.length != 0)
			{
				description += this.nearestGrabTarget.childObjects[0].getDescription();
			}
			else
			{
				description += this.nearestGrabTarget.getDescription();
			}
			description += "</div>";
		}
		else if (this.nearestObject)
		{
			description += "In front of you:";
			description += "<div class=\"box\">";
			description += this.nearestObject.getDescription();
			description += "</div>";
		}


		// -- recipe

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
			description += "<div class=\"box2\">";
			description += "Pick up a pan or pot to start the recipe.";
			description += "</div>";
		}

		if (a)
		{
			b = a.getDescription();
		}

		
		// -- status

		let status: string = "";
		let starsMax: number = 0;
		let starsLeft: number;
		let starsCollected: number = 0;

		this.objects.forEach(element => {
			if (element instanceof GameObjectRecipe)
			{
				status += "<b>" + element.name + "</b><br/>";

				starsMax += 5;

				if (element.stars)
				{
					starsCollected += element.stars;
					status += element.stars + "/5<br/>";
				}
				else
				{
					status += "(new)<br/>";
				}
			}
		});

		starsLeft = Math.max(starsMax / 5 * 4 - starsCollected, 0);

		status += "<br/>";
		status += "<b>" + starsCollected + " stars collected</b> of " + starsMax + ".<br/>";
		status += "You need " + starsLeft + " more to finish.";

		if (_statsIo['connected'])
		{
			status += "<br/>";
			status += "<br/>";
			status += "<b>Global stats:</b><br/>";
			status += statsLine("Foods served", STATS_FOODS_SERVED);
			status += statsLine("Fires started", STATS_FIRES_STARTED);
			status += statsLine("Stars collected", STATS_STARS_COLLECTED);
			status += statsLine("Perfect foods", STATS_FOODS_PERFECT);
			status += statsLine("Total pats", STATS_PATS);
		}

		let newLevelFinished: boolean = (this.lastLevelNumber > 1 && starsLeft <= 0);

		if (!this.levelFinished && newLevelFinished)
		{
			// just finished the level
			statsIncrease(STATS_LEVELS_FINISHED, 1);
		}

		this.levelFinished = newLevelFinished;

		setInnerHTML("r1", b);
		setInnerHTML("r2", description);
		setInnerHTML("r3", status);
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
						
						if (a.childObjects[0] instanceof GameObjectContainer && (this.grabbedObject instanceof GameObjectIngredient || (this.grabbedObject && this.grabbedObject instanceof GameObjectSeasoning)))
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
			else if (a instanceof GameObject && !(a instanceof GameObjectPlayer || a instanceof GameObjectSlot || a instanceof GameObjectWall))
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

	sayHelpTexts()
	{
		if (this.levelFinished && !this.levelFinishSaid)
		{
			window.setTimeout(dialogStart.bind(null, [[ 3, 1, "Wow, you just completed all orders!<br/>Check your action buttons to proceed to the next level." ]]), 1000);
			this.levelFinishSaid = true;
		}
	}

	onFrame()
	{
		let delta = 1000/60;

		this.ticks += 1;
		
		let scale = (window.innerHeight / 1080) * 1.2;

		this.handleInput();
		if (!this.paused && !this.welcomePaused)
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
			this.sayHelpTexts();
			this.cleanupDestroyedObjects();
		}

		window.requestAnimationFrame(this.onFrame.bind(this));
	}

	onDropGrabbedObject()
	{
		_assert(this.grabbedObject);
		_assert(this.nearestDropTarget);
		
		if (this.nearestDropTarget.catch(this.grabbedObject))
		{
			this.grabbedObject = null;
		}
		playSound(SOUND_DROP);
	}

	onGrabObject()
	{
		_assert(this.nearestGrabTarget);

		this.nearestGrabTarget.giveToPlayer();
		playSound(SOUND_PICK_UP);
	}

	onLightObject()
	{
		_assert(this.nearestGrabTarget);
		_assert(this.nearestGrabTarget.childObjects[0]);

		(this.nearestGrabTarget.childObjects[0] as GameObjectContainer).isOnFire = true;
		playSound(SOUND_FRYING);
		statsIncrease(STATS_FIRES_STARTED, 1);
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

	onNextLevelClick()
	{
		this.loadNextLevelDelayed();
	}

	onAcceptRecipe()
	{
		_assert(this.nearestObject);

		if (this.recipeToCook && this.recipeToCook.status == RECIPE_STATUS_ACCEPTED)
		{
			this.recipeToCook.status = RECIPE_STATUS_NEW;
		}
		this.recipeToCook = (this.nearestObject as GameObjectRecipe);
		this.recipeToCook.status = RECIPE_STATUS_ACCEPTED;

		statsIncrease(STATS_FOODS_STARTED, 1);
	}

	evaluate()
	{
		_assert(this.grabbedObject);

		if (!(this.grabbedObject instanceof GameObjectContainer))
		{
			dialogStart([[ 0, 2, "Hmm... maybe I should not serve this." ]]);
			return false;
		}

		if (!this.grabbedObject.recipe)
		{
			dialogStart([[ 0, 2, "Ooof, I forgot the recipe!" ]]);
			return false;
		}

		this.grabbedObject.evaluate();

		statsIncrease(STATS_FOODS_SERVED, 1);

		if (this.grabbedObject.recipe.stars == 5)
		{
			statsIncrease(STATS_FOODS_PERFECT, 1);
		}

		return true;
	}

	onAddSeasoning(n: number)
	{
		// _assert();... huhh
		(this.nearestDropTarget.childObjects[0] as GameObjectContainer).seasoning[n]++;
		playSound(SOUND_SEASONING);
	}

	onPetCerberus()
	{
		this.pats++;

		if (this.pats % 3 == 0)
		{
			emitParticle(this.playerObject.position.x, this.playerObject.position.y, 30, 50, 10, 10, "a3", 3000);
			playSound(SOUND_BLIP);
		}
		else
		{
			playSound(SOUND_STEP_2);
		}
		statsIncrease(STATS_PATS, 1);
	}

	updateActions()
	{
		_input.deregisterAction(0);
		_input.deregisterAction(1);

		if (!this.grabbedObject && this.levelFinished)
		{
			_input.registerAction(1, 'Next level', this.onNextLevelClick.bind(this));
		}

		if (!this.grabbedObject && this.nearestObject && this.nearestObject instanceof GameObjectRecipe && this.nearestObject.status != RECIPE_STATUS_ACCEPTED)
		{
			_input.registerAction(0, 'Accept', this.onAcceptRecipe.bind(this));
		}
		else
		{
			if (this.grabbedObject)
			{
				if (this.nearestDropTarget)
				{
					if (this.grabbedObject instanceof GameObjectSeasoning && this.nearestDropTarget.childObjects.length != 0 && this.nearestDropTarget.childObjects[0] instanceof GameObjectContainer)
					{
						_input.registerAction(0, 'Add chili', this.onAddSeasoning.bind(this, 0));
						_input.registerAction(1, 'Add pepper', this.onAddSeasoning.bind(this, 1));
					}
					else
					{
						_input.registerAction(0, 'Drop', this.onDropGrabbedObject.bind(this));
					}
				}
			}
			else // !this.grabbedObject
			{
				if (this.nearestDropTarget && this.nearestDropTarget instanceof GameObjectSlotTrash)
				{
					_input.registerAction(0, 'Pet', this.onPetCerberus.bind(this));
				}
				else if (this.nearestGrabTarget)
				{
					_input.registerAction(0, 'Grab', this.onGrabObject.bind(this));
					if (this.nearestGrabTarget.childObjects.length != 0 && this.nearestGrabTarget.childObjects[0] instanceof GameObjectContainer && !(this.nearestGrabTarget.childObjects[0] as GameObjectContainer).isOnFire)
					{
						_input.registerAction(1, 'Light it', this.onLightObject.bind(this));
					}
				}
			}
		}
	}

	setPause(value: boolean, showMenu: boolean = false)
	{
		this.paused = value;

		if (value && showMenu)
		{
			getDomElement("o2").style.display = "block"; // main overlay
		}
		if (!value)
		{
			getDomElement("o2").style.display = "none"; // main overlay
		}
	}

	start()
	{
		this.loadLevel(0);
		this.onFrame();
	}
}