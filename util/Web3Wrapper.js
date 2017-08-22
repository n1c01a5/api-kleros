import * as _ from 'lodash';

class Web3Wrapper {
  constructor(web3Instance) {
    this._web3 = web3Instance;
  }

  isAddress = address => this._web3.isAddress(address)

  getCoinbase = () => {
    return this._web3.eth.coinbase;
  }

  doesContractExistAtAddressAsync = async (address) => {
    const code = await this._web3.eth.getCode(address);
    // Regex matches 0x0, 0x00, 0x in order to accommodate poorly implemented clients
    const codeIsEmpty = /^0x0{0,40}$/i.test(code);

    return !codeIsEmpty;
  }

  getNetworkIdIfExistsAsync = async () => {
    if (!_.isUndefined(this.networkIdIfExists)) {
      return this.networkIdIfExists;
    }

    try {
      const networkId = await this.getNetworkAsync();

      this.networkIdIfExists = Number(networkId);
      return this.networkIdIfExists;
    } catch (err) {

      return undefined;
    }
  }

  _getNetworkAsync = async () => {
    const networkId = await this._web3.version.getNetwork();

    return networkId;
  }

  getBalanceInWeiAsync = (owner) => {

    if (_.isUndefined(owner)) {
      owner = this._web3.eth.accounts[0];
    }

    let balanceInWei = this._web3.eth.getBalance(owner);

    return balanceInWei.toString();
  }
}

export default Web3Wrapper;
