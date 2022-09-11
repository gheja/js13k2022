// NOT part of the Visual Studio Code build process (excluded in tsconfig.json)

// These classes, functions and variables are not part of the code but are
// included in external libraries or imports. This prevents Google Closure
// Compiler from renaming them.

let io = {};
io.connect = function(a){};
io.connect.on = function(a, b){};
io.connect.emit = function(a, b){};
io.listen = function(a){};
io.sockets = {};
io.sockets.socket = {};

/*
// I don't have time to properly do this, creating a hand minimized version instead...

window.nearApi = {};
window.nearApi.connect = function(a){};
window.nearApi.connect.then = function(a){};
window.nearApi.keyStores = {};
window.nearApi.keyStores.BrowserLocalStorageKeyStore = function();
window.nearApi.WalletConnection = function();
*/

document.monetization = {};
document.monetization.state = false;

let na = function(){}; // _nearActive
let nw = 1; // _nearWallet
let nn = ""; // _nearNetName
let nl = function(){}; // nearLogin()
let ni = function(){}; // nearInit()
let nt = function(){}; // nearTip()

