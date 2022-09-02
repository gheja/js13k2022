class Input
{
	keysPressed: Array<boolean> = Array();
	keysWerePressed: Array<boolean> = Array();
	keyboardUsedTick: number = 0;
	psGamepadUsedTick: number = 0;
	xboxGamepadUsedTick: number = 0;
	
	validKeys = [ "w", "a", "s", "d", "z", "q", " ", "x", "c", "arrowup", "arrowleft", "arrowdown", "arrowright" ];

	constructor()
	{

	}
	
	onKeyEvent(event: KeyboardEvent)
	{
		let a = event.key.toLowerCase();
	
		if (this.validKeys.indexOf(a) === -1 || (event.type != "keydown" && event.type != "keyup") || event.repeat)
		{
			return;
		}
	
		this.keysPressed[a] = (event.type == "keydown");

		if (event.type == "keydown")
		{
			this.keysWerePressed[a] = true;
		}

		this.keyboardUsedTick = _game.ticks;

		event.preventDefault();
	}
	
	clearPressedKeys()
	{
		this.validKeys.forEach(element => {
			this.keysWerePressed[element] = false;
		});
	}

	getSpeedAndDirection()
	{
		let y: number = 0;
		let x: number = 0;
		let speed: number;
		let direction: number;

		// keyboard input (wasd, zqsd)
		x += (_input.keysPressed["arrowleft"]  || _input.keysPressed["a"] || _input.keysPressed["q"]) ? -1 : 0;
		x += (_input.keysPressed["arrowright"] || _input.keysPressed["d"]							) ? +1 : 0;
		y += (_input.keysPressed["arrowup"]	|| _input.keysPressed["w"] || _input.keysPressed["z"]) ? -1 : 0;
		y += (_input.keysPressed["arrowdown"]  || _input.keysPressed["s"]							) ? +1 : 0;

		// gamepad
		let a = navigator.getGamepads()
		if (a.length > 0 && a[0])
		{
			if (round2(a[0].axes[0]) || round2(a[0].axes[1]) || a[0].buttons[0].pressed || a[0].buttons[1].pressed)
			{
				if (a[0].id.match(/xbox|x-box|xinput|45e/i))
				{
					this.xboxGamepadUsedTick = _game.ticks;
				}
				else
				{
					this.psGamepadUsedTick = _game.ticks;
				}

				x += a[0].axes[0];
				y += a[0].axes[1];
			}

		}


		// clamp to the valid range
		x = clamp(-1, 1, x);
		y = clamp(-1, 1, y);

		// handle dead zones
		if (round2(x) == 0 && round2(y) == 0)
		{
			x = 0;
			y = 0;
		}

		// x = round2(x);
		// y = round2(y);

		// ...
		speed = clamp(0, 1, Math.abs(x) + Math.abs(y));
		direction = Math.atan2(y, x);

		return { "speed": speed, "direction": direction };
	}

	start()
	{
		this.validKeys.forEach(element => {
			this.keysPressed[element] = false;
		});

		this.clearPressedKeys();

		window.addEventListener("keydown", this.onKeyEvent.bind(this));
		window.addEventListener("keyup", this.onKeyEvent.bind(this));
	}
}

