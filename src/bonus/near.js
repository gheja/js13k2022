// 4bac6a20787a1ac17f03bc524e0c62a36df6bc147a3597b6beb34a5237a57cac

// <script src="https://cdn.jsdelivr.net/npm/near-api-js@0.45.1/dist/near-api-js.min.js"></script>
let _nearWallet;

function nearLogin()
{
    _nearWallet["requestSignIn"]();
}

function nearInit()
{
    window.nearApi
    .connect({
        nodeUrl: "https://rpc.mainnet.near.org",
        walletUrl: "https://wallet.mainnet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.mainnet.near.org",
        networkId: "mainnet",
        keyStore: new window.nearApi.keyStores.BrowserLocalStorageKeyStore(),
    })
    .then((near) => {
        _nearWallet = new window.nearApi.WalletConnection(near);
        _nearActive = _nearWallet["isSignedIn"]();
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
