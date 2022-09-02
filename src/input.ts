class Input
{
	_keysPressed = Array();
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
	
		this._keysPressed[a] = (event.type == "keydown");

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
	
	start()
	{
		this._validKeys.forEach(element => {
			this._keysPressed[element] = false;
		});

		this.clearPressedKeys();

		window.addEventListener("keydown", this.onKeyEvent.bind(this));
		window.addEventListener("keyup", this.onKeyEvent.bind(this));
	}
}

