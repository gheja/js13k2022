class Game
{
	frame_number: number;

	constructor()
	{
		this.frame_number = 0;
	}

	tick()
	{

	}

	handleInput()
	{
		let y = 0;
		let x = 0;
		let speed;
		let direction;

		// keyboard input (wasd, zqsd)
		x += (_input._keysPressed["arrowleft"]  || _input._keysPressed["a"] || _input._keysPressed["q"]) ? -1 : 0;
		x += (_input._keysPressed["arrowright"] || _input._keysPressed["d"]							) ? +1 : 0;
		y += (_input._keysPressed["arrowup"]	|| _input._keysPressed["w"] || _input._keysPressed["z"]) ? -1 : 0;
		y += (_input._keysPressed["arrowdown"]  || _input._keysPressed["s"]							) ? +1 : 0;

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

		// normalize
		speed = clamp(0, 1, Math.abs(x) + Math.abs(y));
		// direction = ;

		if (speed > 0.5)
		{
			console.log([ speed, direction ]);
		}

		_input.clearPressedKeys();
	}

	onFrame()
	{
		this.frame_number += 1;

		this.handleInput();

		window.requestAnimationFrame(this.onFrame.bind(this));
	}

	start()
	{
		this.onFrame();
	}
}