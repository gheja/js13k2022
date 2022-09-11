let _stats: Array<number>;
let _statsGlobal: Array<number>;
let _statsIo: any;

// TODO: between statsSend() and onStatsReceived() _stats is zero but
// _statsGlobal does not contain the latest stats sent.

function statsReset()
{
    _stats = [0,0,0,0,0,0,0,0,0,0,0,0];
}

function statsSend()
{
    _statsIo.emit(MESSAGE_RECORD, _stats);
    statsReset();
}

function onStatsReceived(a)
{
    _statsGlobal = a;
    console.log(a);
}

function statsIncrease(n: number, count: number)
{
    _stats[n] += count;
}

function statsInit()
{
    _statsGlobal = [0,0,0,0,0,0,0,0,0,0,0,0];
    statsReset();

    try
    {
        _statsIo = io();
    }
    catch (e)
    {
        _statsIo = { emit: function() {}, on: function() {} };
    }
    
    _statsIo.on(MESSAGE_STATS, onStatsReceived);
    _statsIo.on("connect", statsSend);

    window.setInterval(statsSend, 5000);
}
