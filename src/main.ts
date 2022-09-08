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

function onSpritesLoaded()
{
	_game = new Game();
	_input = new Input();

	_game.start();
	_input.start();

	// window.setTimeout(introStart, 1000);
}

function init()
{
	_divLayer = getObject("d");

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
