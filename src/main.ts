let _game: Game;
let _input: Input;

function introStart()
{
	addClass("bar1", "visible");
	addClass("bar2", "visible");
	
	dialogStart([
		[ 2, 2, "*ring-ring*" ],
		[ 0, 2, "Knock-knock!" ],
		[ 1, 1, "Who's there?" ],
		[ 0, 2, "I don't know" ],
		[ 1, 1, "Erm..." ],
		[ 1, 1, "Go away?" ],
		[ 0, 2, "Bye then!" ],
		[ 1, 1, "Bye!" ],
	]);
}

function init()
{
	_game = new Game();
	_input = new Input();
	_game.start();
	_input.start();
	window.setTimeout(introStart, 1000);
}

window.addEventListener("load", init);
