let _names = [ "Devil", "Skully", "phone" ];
let _dialog;
let _dialogIndex;
let _dialogTimeout;

function dialogShowLine(obj, line)
{
	let name = obj.getElementsByClassName("name")[0];
	let text = obj.getElementsByClassName("text")[0];
	
	addClass(obj, "speak-visible");
	
	name.innerHTML = _names[line[0]];
	text.innerHTML = line[2];
	
	_input.registerAction(0, "Continue", dialogStep.bind(null));
}

function dialogEnd()
{
	if (_dialogTimeout)
	{
		window.clearTimeout(_dialogTimeout);
	}
	
	removeClass(getObject("speak1"), "speak-visible");
	removeClass(getObject("speak2"), "speak-visible");
	removeClass(getObject("bar1"), "visible");
	removeClass(getObject("bar2"), "visible");

	_input.deregisterAction(0);
	_input.deregisterAction(1);
	_game.unpause();
}

function dialogStep()
{
	if (_dialogIndex >= _dialog.length)
	{
		dialogEnd();
		return;
	}
	
	let line = _dialog[_dialogIndex];
	let obj = getObject("speak" + line[1]);
	
	removeClass(obj, "speak-visible");
	_dialogTimeout = window.setTimeout(dialogShowLine.bind(this, obj, line), 200);
	
	_dialogIndex++;
}

function dialogStart(dialog)
{
	_dialog = dialog;
	_dialogIndex = 0;
	_game.pause();

	addClass(getObject("bar1"), "visible");
	addClass(getObject("bar2"), "visible");
	
	dialogStep();
}
