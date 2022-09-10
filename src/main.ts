let _game: Game;
let _input: Input;
let _divLayer: HTMLElement;
let _floorImage: HTMLImageElement;
let _floorHeight: number = 120;
let _floorWidth: number = 200;
let _sprites: HTMLImageElement;

let _padX = 0;
let _padY = 0;
let _zoom = 3;

function introStart()
{
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

function welcomeStart()
{
	_input.registerAction(0, "Start", welcomeProceed);

	// it got registered on level load
	_input.deregisterAction(2);
}

function welcomeProceed()
{
	getDomElement("welcome-overlay").style.display = "none";
	_game.welcomePaused = false;
	_game.loadLevel(FIRST_LEVEL_NUMBER);
}

function onSpritesLoaded()
{
	_game = new Game();
	_input = new Input();

	_game.welcomePaused = true;
	_game.start();
	_input.start();

	welcomeStart();
}

function init()
{
	_divLayer = getDomElement("d");

	_sprites = new Image();
	_sprites.addEventListener("load", onSpritesLoaded);
	_sprites.src = GFX_SPRITES;
}

function b(n: number)
{
	if (n == 1)
	{
		_game.onPauseClick();
	}
	else if (n == 2)
	{
		_game.onReloadLevelClick();
	}
}

window.addEventListener("load", init);
