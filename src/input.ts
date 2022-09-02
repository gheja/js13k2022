class Input
{
	_keyValues = Array();
	_keysWerePressed = Array();
	
	_validKeys = [ "w", "a", "s", "d", "z", "q", " ", "x", "c", "arrowup", "arrowleft", "arrowdown", "arrowright" ];

	constructor()
	{

	}
	
	onKeyEvent(event: KeyboardEvent)
	{
		let a = event.key.toLowerCase();
	
		if (this._validKeys.indexOf(a) === -1 || (event.type != "keydown" && event.type != "keyup") || event.repeat)
		{
			return;
		}
	
		this._keyValues[a] = (event.type == "keydown") ? 1 : 0;

		if (event.type == "keydown")
		{
			this._keysWerePressed[a] = true;
		}
	
		event.preventDefault();
	}
	
	clearPressedKeys()
	{
		this._validKeys.forEach(element => {
			this._keysWerePressed[element] = false;
		});
	}

	getSpeedAndDirection()
	{
		let y: number = 0;
		let x: number = 0;
		let speed: number;
		let direction: number;

		// keyboard input (wasd, zqsd)
		x += (_input._keyValues["arrowleft"]  || _input._keyValues["a"] || _input._keyValues["q"]) ? -1 : 0;
		x += (_input._keyValues["arrowright"] || _input._keyValues["d"]							) ? +1 : 0;
		y += (_input._keyValues["arrowup"]	|| _input._keyValues["w"] || _input._keyValues["z"]) ? -1 : 0;
		y += (_input._keyValues["arrowdown"]  || _input._keyValues["s"]							) ? +1 : 0;

		// TODO: gamepad input

		// clamp to the valid range
		x = clamp(-1, 1, x);
		y = clamp(-1, 1, y);

		// handle dead zones
		if (Math.abs(x) < 0.5)
		{
			x = 0;
		}

		if (Math.abs(y) < 0.5)
		{
			y = 0;
		}

		// ...
		speed = clamp(0, 1, Math.abs(x) + Math.abs(y));
		direction = Math.atan2(y, x);

		return { "speed": speed, "direction": direction };
	}

	start()
	{
		this._validKeys.forEach(element => {
			this._keyValues[element] = false;
		});

		this.clearPressedKeys();

		window.addEventListener("keydown", this.onKeyEvent.bind(this));
		window.addEventListener("keyup", this.onKeyEvent.bind(this));
	}
}

