/// <reference path="external.d.ts" />

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

let _coilActive: boolean = false;
// let _nearActive: boolean = false;
// moved it to near.js na()

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

function welcomeProceed()
{
	document.body.classList.remove('w');
	_game.welcomePaused = false;
	_game.loadLevel(FIRST_LEVEL_NUMBER);
}

function welcomeStart()
{
	_input.registerAction(0, "Start", welcomeProceed);

	// it got registered on level load
	_input.deregisterAction(2);
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

function updateBonuses()
{
	setInnerHTML("wc", _coilActive ? "Coil is active, thank you!" : "Coil is inactive.");
	setInnerHTML("wn",
		(na() ? "NEAR is active!" : "<span onclick=\"b(3);\" class=\"link\">Click to log in to NEAR " + nn + ".</span>") +
		(window.location.search.indexOf("nHa") > 0 ? "<br/><br/>Thank you very much for your tip!" : "") // "nHa" = "transactionHashes"
	);
	getDomElement("mn").style.display = (na() ? "" : "none");
}

function init()
{
	_divLayer = getDomElement("d");

	_sprites = new Image();
	_sprites.addEventListener("load", onSpritesLoaded);
	_sprites.src = GFX_SPRITES;

	statsInit();

	// bonuses
	ni();
	coilInit();
	window.setInterval(updateBonuses, 1000);
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
	else if (n == 3)
	{
		// nearLogin();
		nl();
	}
	else if (n == 4)
	{
		// nearTip();
		nt();
	}
}

window.addEventListener("load", init);
