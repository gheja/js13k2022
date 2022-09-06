class Input
{
	keysPressed: Array<boolean> = Array();
	keysJustPressed: Array<boolean> = Array();
	keyboardUsedTick: number = 0;
	psGamepadUsedTick: number = 0;
	xboxGamepadUsedTick: number = 0;
	gamepadButtonPressed: Array<boolean> = Array();
	gamepadButtonJustPressed: Array<boolean> = Array();

	actions: Array<any> = [ null, null, null ];
	
	validKeys = [ "w", "a", "s", "d", "z", "q", " ", "x", "arrowup", "arrowleft", "arrowdown", "arrowright", "escape" ];

	constructor()
	{

	}

	registerAction(index: number, text: string, callback: any)
	{
		this.actions[index] = callback;
		getObject("a" + index.toString()).style.display = "block";
		getObject("b" + index.toString()).innerHTML = text;
	}

	deregisterAction(index: number)
	{
		this.actions[index] = null;
		getObject("a" + index.toString()).style.display = "none";
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
			this.keysJustPressed[a] = true;
		}

		this.keyboardUsedTick = _game.ticks;

		event.preventDefault();
	}
	
	clearPressedKeys()
	{
		this.validKeys.forEach(element => {
			this.keysJustPressed[element] = false;
		});
		this.gamepadButtonJustPressed[0] = false;
		this.gamepadButtonJustPressed[1] = false;
		this.gamepadButtonJustPressed[9] = false;
	}

	getSpeedAndDirection()
	{
		let y: number = 0;
		let x: number = 0;
		let speed: number;
		let direction: number;

		// keyboard input (wasd, zqsd)
		x += (this.keysPressed["arrowleft"]  || this.keysPressed["a"] || this.keysPressed["q"]) ? -1 : 0;
		x += (this.keysPressed["arrowright"] || this.keysPressed["d"]						 ) ? +1 : 0;
		y += (this.keysPressed["arrowup"]	|| this.keysPressed["w"] || this.keysPressed["z"]) ? -1 : 0;
		y += (this.keysPressed["arrowdown"]  || this.keysPressed["s"]						 ) ? +1 : 0;

		// gamepad
		let gamepads = navigator.getGamepads()
		if (gamepads.length > 0 && gamepads[0])
		{
			if (round2(gamepads[0].axes[0]) || round2(gamepads[0].axes[1]) || gamepads[0].buttons[0].pressed || gamepads[0].buttons[1].pressed || gamepads[0].buttons[9].pressed)
			{
				if (gamepads[0].id.match(/xbox|x-box|xinput|45e/i))
				{
					this.xboxGamepadUsedTick = _game.ticks;
				}
				else
				{
					this.psGamepadUsedTick = _game.ticks;
				}

				x += gamepads[0].axes[0];
				y += gamepads[0].axes[1];
			}

			// handle Button 0 and Button 1 ("A" and "B" on an X-Box controller, "X" and "O" on a PS controller)
			for (let i=0; i<10; i++)
			{
				if (gamepads[0].buttons[i].pressed)
				{
					if (!this.gamepadButtonPressed[i])
					{
						this.gamepadButtonJustPressed[i] = true;
					}
					
					this.gamepadButtonPressed[i] = true;
				}
				else
				{
					this.gamepadButtonPressed[i] = false;
				}
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

	handleActions()
	{
		if ((this.gamepadButtonJustPressed[0] || this.keysJustPressed[" "]) && this.actions[0])
		{
			this.actions[0].call();
		}

		if ((this.gamepadButtonJustPressed[1] || this.keysJustPressed["x"]) && this.actions[1])
		{
			this.actions[1].call();
		}

		if ((this.gamepadButtonJustPressed[9] || this.keysJustPressed["escape"]) && this.actions[2])
		{
			this.actions[2].call();
		}
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

