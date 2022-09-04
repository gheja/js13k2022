class Game
{
	ticks: number;
	time: number;
	maxSpeed: number = 100;
	playerObject: GameObjectPlayer;
	paused: boolean = false;
	objects: Array<GameObject>;

	constructor()
	{
		this.objects = [];
		this.playerObject = new GameObjectPlayer(new Vec2D(0, 0));
		this.objects.push(new GameObjectContainer(new Vec2D(0, 0)));
		this.objects.push(new GameObjectContainer(new Vec2D(0, 50)));
		this.objects.push(new GameObjectSlot(new Vec2D(50, 50)));
		this.objects.push(new GameObjectSlot(new Vec2D(100, 50)));
		this.ticks = 0;
		this.time = 0;

		this.objects[0].grabbed = true;
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

	onFrame()
	{
		let delta = 1000/60;

		this.ticks += 1;
		this.time += delta;

		let scale = window.innerHeight / 1080;

		this.handleInput();
		if (!this.paused)
		{
			this.playerObject.moveAndSlide(delta);
			this.playerObject.update();
			this.objects.forEach(element => element.update());
			// this.sortObjects();

			// TODO: check this alignment
			_divLayer.style.transform = "scale(" + scale + ") perspective(800px) translateY(150px)";
			_divLayer.style.left = (window.innerWidth / 2 - _z(_floorWidth) / 2) + "px";

			_divLayer.style.transformOrigin = (_floorWidth * 0.5 + this.playerObject.position.x) + "px " + (this.playerObject.position.y * 0.5) + "px";
		}

		window.requestAnimationFrame(this.onFrame.bind(this));
	}

	onDropGrabbedObject()
	{
		let a: GameObject, b: GameObject;

		for (a of this.objects)
		{
			if (a instanceof GameObjectSlot && dist2d(a.position, this.playerObject.position) < 15 && a.objectInSlot === null)
			{
				for (b of this.objects)
				{
					if (b.grabbed)
					{
						b.position.copyFrom(a.position);
						a.objectInSlot = b;
						b.grabbed = false;
					}
				}
				break;
			}
		}
	}

	popUpActions()
	{
		_input.deregisterAction(0);
		_input.deregisterAction(1);
		_input.registerAction(0, 'Drop', this.onDropGrabbedObject.bind(this));
	}

	pause()
	{
		this.paused = true;
	}

	unpause()
	{
		this.popUpActions();
		this.paused = false;
	}

	start()
	{
		this.onFrame();
		_input.deregisterAction(0)
		_input.deregisterAction(1)
	}
}