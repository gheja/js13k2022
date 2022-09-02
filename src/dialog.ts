let _names = [ "Devil", "Skully", "phone" ];
let _dialog;
let _dialogIndex;

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
	removeClass("speak1", "speak-visible");
	removeClass("speak2", "speak-visible");
	removeClass("bar1", "visible");
	removeClass("bar2", "visible");
	_input.deregisterAction(0);
	_input.deregisterAction(1);
}

function dialogStep()
{
	if (_dialogIndex >= _dialog.length)
	{
		dialogEnd();
		return
	}
	
	let line = _dialog[_dialogIndex];
	let obj = document.getElementById("speak" + line[1]);
	
	removeClass(obj, "speak-visible");
	window.setTimeout(dialogShowLine.bind(this, obj, line), 200);
	
	_dialogIndex++;
}

function dialogStart(dialog)
{
	_dialog = dialog;
	_dialogIndex = 0;
	
	dialogStep();
}
