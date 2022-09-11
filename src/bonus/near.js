// 4bac6a20787a1ac17f03bc524e0c62a36df6bc147a3597b6beb34a5237a57cac

// <script src="https://cdn.jsdelivr.net/npm/near-api-js@0.45.1/dist/near-api-js.min.js"></script>
let _nearWallet;
let _nearNetName = "testnet";

function nearActive()
{
    return _nearWallet["isSignedIn"]();
}

function nearLogin()
{
    _nearWallet["requestSignIn"]();
}

function nearInit()
{
    window.nearApi
    .connect({
        nodeUrl: "https://rpc." + _nearNetName + ".near.org",
        walletUrl: "https://wallet." + _nearNetName + ".near.org",
        helperUrl: "https://helper." + _nearNetName + ".near.org",
        explorerUrl: "https://explorer." + _nearNetName + ".near.org",
        networkId: _nearNetName,
        keyStore: new window.nearApi.keyStores.BrowserLocalStorageKeyStore(),
    })
    .then((near) => {
        _nearWallet = new window.nearApi.WalletConnection(near);
    });
}

async function nearTip()
{
    const account = await _nearWallet.account();
    await account.sendMoney(
        "4bac6a20787a1ac17f03bc524e0c62a36df6bc147a3597b6beb34a5237a57cac",
        "250000000000000000000000"// about 1.5 USD
    );
}

let na = nearActive;
let nw = _nearWallet;
let nn = _nearNetName;
let nl = nearLogin;
let ni = nearInit;
let nt = nearTip;
