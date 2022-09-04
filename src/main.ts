let _game: Game;
let _input: Input;
let _divLayer: HTMLElement;
let _floorImage: HTMLImageElement;
let _sprites: HTMLImageElement;

let _padX = 0;
let _padY = 0;
let _zoom = 1;

function introStart()
{
	addClass(getObject("bar1"), "visible");
	addClass(getObject("bar2"), "visible");
	
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
	window.setTimeout(introStart, 1000);
}

function init()
{
	_divLayer = getObject("d");

	_floorImage = (newElement(_divLayer, "img", "") as HTMLImageElement);
	_floorImage.className = "floor";
	_floorImage.src = GFX_FLOOR;

	_sprites = new Image();
	_sprites.addEventListener("load", onSpritesLoaded);
	_sprites.src = GFX_SPRITES;
}

window.addEventListener("load", init);
