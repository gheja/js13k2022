class Game
{
	ticks: number;
	time: number;
	maxSpeed: number = 50;
	playerObject: GameObjectPlayer;
	paused: boolean = false;
	objects: Array<GameObject>;

	constructor()
	{
		this.objects = [];
		this.playerObject = new GameObjectPlayer(new Vec2D(100, 100));
		this.objects.push(new GameObjectContainer(new Vec2D(180, 100)));
		this.ticks = 0;
		this.time = 0;
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
		this.ticks += 1;
		this.time += 1000/60;

		this.handleInput();
		if (!this.paused)
		{
			this.playerObject.moveAndSlide(1000/60);
			this.playerObject.update();
			this.objects[0].update();
			// this.sortObjects();
		}

		window.requestAnimationFrame(this.onFrame.bind(this));
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