window.addEventListener('load', function () {

    window.web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org/"));

})

const promisify = (inner) =>
    new Promise((resolve, reject) =>
        inner((err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        })
    );

async function getBalance() {
    var address, wei, balance
    address = document.getElementById("address").value;
    wei = promisify(cb => web3.eth.getBalance(address, cb))
    try {
        balance = web3.fromWei(await wei, 'ether')
        document.getElementById("output").innerHTML = balance + " BNB";
    } catch (error) {
        document.getElementById("output").innerHTML = error;
    }
}
async function getERC20Balance() {
    var address, contractAddress, contractABI, tokenConztract, decimals, balance, name, symbol, adjustedBalance
    address = document.getElementById("address").value
    contractAddress = document.getElementById("contractAddress").value
    contractABI = bep20_token_abi

    tokenContract = web3.eth.contract(contractABI).at(contractAddress)

    decimals = promisify(cb => tokenContract.decimals(cb))
    balance = promisify(cb => tokenContract.balanceOf(address, cb))
    name = promisify(cb => tokenContract.name(cb))
    symbol = promisify(cb => tokenContract.symbol(cb))

    try {
        adjustedBalance = await balance / Math.pow(10, await decimals)
        document.getElementById("output2").innerHTML = adjustedBalance;
        document.getElementById("output2").innerHTML += " " + await symbol + " (" + await name + ")";
    } catch (error) {
        document.getElementById("output2").innerHTML = error;
    }
}
