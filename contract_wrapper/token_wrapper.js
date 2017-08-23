import * as _ from 'lodash';
import * as BigNumber from 'bignumber.js';
// import {Web3Wrapper} from '../util/web3';
import * as TokenArtifact from '../artifact/Token.json';
import ContractWrapper from './contract_wrapper';

/**
 * This class includes all the functionality related to interacting with ERC20 token contracts.
 * All ERC20 method calls are supported.
 */
class TokenWrapper extends ContractWrapper {
  /**
   * Retrieves an owner's ERC20 token balance.
   * @param   tokenAddress    The hex encoded contract Ethereum address where the ERC20 token is deployed.
   * @param   ownerAddress    The hex encoded user Ethereum address whose balance you would like to check.
   * @return  The owner's ERC20 token balance in base units.
   */
  getBalance = async (tokenAddress, ownerAddress) => {
    const tokenContract = await this._getTokenContractAsync(tokenAddress)
    let balance = await tokenContract.balanceOf.call(ownerAddress)

    // Wrap BigNumbers returned from web3 with our own (later) version of BigNumber
    balance = new BigNumber(balance)

    return balance
  }

  /**
   * Retrieves an owner's ERC20 token balance.
   * @param   tokenAddress    The hex encoded contract Ethereum address where the ERC20 token is deployed.
   * @return  tokenContract
   */
  _getTokenContractAsync = async (tokenAddress) => {
    let tokenContract = this._tokenContractsByAddress[tokenAddress]

    if (!_.isUndefined(tokenContract)) {
      return tokenContract
    }

    const contractInstance = await this._instantiateContractIfExistsAsync(TokenArtifact, tokenAddress);

    tokenContract = contractInstance;
    this._tokenContractsByAddress[tokenAddress] = tokenContract;

    return tokenContract;
  }
}

export default TokenWrapper;
