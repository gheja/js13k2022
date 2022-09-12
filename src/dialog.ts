let _names = [ "Devil", "Skully", "phone", "Goblin" ];
let _dialog;
let _dialogIndex;
let _dialogTimeout;

function dialogShowLine(obj, line)
{
	let name = obj.getElementsByClassName("n")[0]; // name
	let text = obj.getElementsByClassName("t")[0]; // text
	
	addClass(obj, "u"); // speak-visible
	
	name.innerHTML = _names[line[0]];
	text.innerHTML = line[2];

	if (line[1] == 1)
	{
		// lower dialog box
		playSound(SOUND_SPEAK_1);
	}
	else
	{
		// upper dialog box
		playSound(SOUND_SPEAK_2);
	}
	
	_input.registerAction(0, "Continue", dialogStep.bind(null));
}

function dialogEnd()
{
	if (_dialogTimeout)
	{
		window.clearTimeout(_dialogTimeout);
	}
	
	removeClass(getDomElement("s1"), "u"); // speak1, speak-visible
	removeClass(getDomElement("s2"), "u"); // speak2, speak-visible
	removeClass(getDomElement("f1"), "v"); // bar1, visible
	removeClass(getDomElement("f2"), "v"); // bar2, visible

	_input.deregisterAction(0);
	_input.deregisterAction(1);
	_input.registerAction(2, "Pause", _game.onPauseClick.bind(_game));

	_game.setPause(false);
	if (_game.onDialogEnd)
	{
		_game.onDialogEnd.call();
	}
}

function dialogStep()
{
	_input.deregisterAction(0);

	if (_dialogIndex >= _dialog.length)
	{
		dialogEnd();
		return;
	}
	
	let line = _dialog[_dialogIndex];
	let obj = getDomElement("s" + line[1]); // speak1/speak2
	let delay = line[3] ? line[3] : 0;
	
	removeClass(obj, "u"); // speak-visible
	_dialogTimeout = window.setTimeout(dialogShowLine.bind(this, obj, line), delay + 200);
	
	_dialogIndex++;
}

function dialogStart(dialog)
{
	_dialog = dialog;
	_dialogIndex = 0;
	_game.setPause(true, false);
	_input.deregisterAction(2);

	addClass(getDomElement("f1"), "v"); // visible
	addClass(getDomElement("f2"), "v"); // visible

	dialogStep();
}
