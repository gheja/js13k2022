let _gpDown = false;
let _gpDownPos = new Vec2D(0, 0);
let _gpPos = new Vec2D(0, 0);
let _gpCanvas: HTMLCanvasElement;
let _gpCtx: CanvasRenderingContext2D;
let _gpButtonMPos: Vec2D;
let _gpButtonAPos: Vec2D;
let _gpButtonBPos: Vec2D;
let _gpButtonsPressed: Array<boolean>;
let _gpButtonsJustPressed: Array<boolean>;
// let _gpH: number;
let _gpH = 20;

function gpRedraw()
{
    _gpCtx.clearRect(0, 0, _gpCanvas.width, _gpCanvas.height);
    _gpCtx.strokeStyle = "#fff";
    _gpCtx.fillStyle = "#fff";
    _gpCtx.lineWidth = 3;
    _gpCtx.font = (_gpH*1.5) + "px bahnschrift";
    _gpCtx.beginPath();
    _gpCtx.arc(_gpPos.x, _gpPos.y, _gpH * 2, 0, Math.PI*2);
    _gpCtx.stroke();
    _gpCtx.beginPath();
    _gpCtx.arc(_gpButtonAPos.x, _gpButtonAPos.y, _gpH, 0, Math.PI*2);
    _gpCtx.stroke();
    _gpCtx.beginPath();
    _gpCtx.arc(_gpButtonBPos.x, _gpButtonBPos.y, _gpH, 0, Math.PI*2);
    _gpCtx.stroke();
    _gpCtx.beginPath();
    _gpCtx.arc(_gpButtonMPos.x, _gpButtonMPos.y, _gpH, 0, Math.PI*2);
    _gpCtx.stroke();
    _gpCtx.fillText("\u2630", _gpButtonMPos.x - _gpH * 0.5 * 1.3, _gpButtonMPos.y + _gpH * 0.5);
    _gpCtx.fillText("A", _gpButtonAPos.x - _gpH * 0.5 * 0.9, _gpButtonAPos.y + _gpH * 0.5);
    _gpCtx.fillText("B", _gpButtonBPos.x - _gpH * 0.5 * 0.9, _gpButtonBPos.y + _gpH * 0.5);
}

function onGpResize()
{
    _gpCanvas.width = window.innerWidth;
    _gpCanvas.height = window.innerHeight * 0.5;
    // _gpH = _gpCanvas.height * 0.15;
    _gpButtonMPos = new Vec2D(_gpCanvas.width - _gpH * 8, _gpCanvas.height - _gpH * 6);
    _gpButtonAPos = new Vec2D(_gpCanvas.width - _gpH * 6, _gpCanvas.height - _gpH * 2);
    _gpButtonBPos = new Vec2D(_gpCanvas.width - _gpH * 4, _gpCanvas.height - _gpH * 6);
    gpRedraw();
}

function onGpEvent(event: TouchEvent)
{
    let a: Vec2D;
    let b: Array<boolean> = [];
    let c = _gpCanvas.height * 0.1;
    let d: boolean;
    let e: boolean;
    let i: number;

    b[0] = false;
    b[1] = false;
    b[9] = false;
    d = false;
    e = false;

    for (i=0;i<event.targetTouches.length;i++)
    {
        a = new Vec2D(event.targetTouches[i].clientX, event.targetTouches[i].clientY - _gpCanvas.offsetTop);

        if (dist2d(a, _gpButtonMPos) < c)
        {
            b[9] = true;
        }

        if (dist2d(a, _gpButtonAPos) < c)
        {
            b[0] = true;
        }

        if (dist2d(a, _gpButtonBPos) < c)
        {
            b[1] = true;
        }

        if (!e && a.x < window.innerWidth * 0.5)
        {    
            d = true;
            e = true;
            _gpPos.x = a.x;
            _gpPos.y = a.y;
        }
    }

    for (i=0;i<10;i++)
    {
        if (b[i] && !_input.gamepadButtonPressed[i])
        {
            _input.gamepadButtonJustPressed[i] = true;
        }

        _input.gamepadButtonPressed[i] = b[i];
    }

    if (d && !_gpDown)
    {
        _gpDownPos.x = _gpPos.x;
        _gpDownPos.y = _gpPos.y;
    }

    _gpDown = d;


    if (!_gpDown)
    {
        _gpPos.x = window.innerWidth * 0.2;
        _gpPos.y = _gpCanvas.height * 0.5;
    }

    _input.xboxGamepadUsedTick = _game.ticks;

    // console.log([ _gpDown, (_gpPos.x - _gpDownPos.x) * 3 / _gpCanvas.height, (_gpPos.y - _gpDownPos.y) * 3 / _gpCanvas.height ]);

    if (!document.fullscreenElement)
    {
        try
        {
            document.body.requestFullscreen();
        }
        catch (e) {}
    }

    gpRedraw();
}

function gpInit()
{
    _gpCanvas = document.createElement("canvas");
    _gpCtx = _gpCanvas.getContext("2d");
    _gpCanvas.id = "gp";
    _gpCanvas.addEventListener("touchstart", onGpEvent);
    _gpCanvas.addEventListener("touchend", onGpEvent);
    _gpCanvas.addEventListener("touchmove", onGpEvent);
    window.addEventListener("resize", onGpResize);
    onGpResize();
    document.body.appendChild(_gpCanvas);
}
