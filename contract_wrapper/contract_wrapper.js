import * as _ from 'lodash'
// import * as BigNumber from 'bignumber.js';
import contract from 'truffle-contract'
import {provider} from '../util/web3Instance'

/**
 * Contract wrapper
 */
class ContractWrapper {
  constructor(web3Instance) {
    this._web3Wrapper = web3Instance
  }

  /**
   * Instantiate contract. Private function?
   * @param   artifact
   * @param   tokenAddress    The hex encoded contract Ethereum address where the ERC20 token is deployed.
   * @return  The owner's ERC20 token balance in base units.
   */
  _instantiateContractIfExistsAsync = async (artifact, address) => {
    const c = await contract(artifact)

    const providerObj = this._web3Wrapper.getCurrentProvider()

    c.setProvider(providerObj)

    const networkIdIfExists = await this._web3Wrapper.getNetworkIdIfExistsAsync()
    const artifactNetworkConfigs = _.isUndefined(networkIdIfExists) ?
                                   undefined :
                                   artifact.networks[networkIdIfExists]
    let contractAddress

    if (!_.isUndefined(address)) {
      contractAddress = address
    } else if (!_.isUndefined(artifactNetworkConfigs)) {
      contractAddress = artifactNetworkConfigs.address
    }

    if (!_.isUndefined(contractAddress)) {
      const doesContractExist = await this._web3Wrapper.doesContractExistAtAddressAsync(contractAddress)

      if (!doesContractExist) {
        throw new Error('ContractDoesNotExist')
      }
    }

    try {
      const contractInstance = _.isUndefined(address) ? await c.deployed() : await c.at(address)

      return contractInstance;
    } catch (err) {
      const errMsg = `${err}`

      if (_.includes(errMsg, 'not been deployed to detected network')) {
        throw new Error('ContractDoesNotExist')
      } else {
        throw new Error('UnhandledError')
      }
    }
  }

  /**
   * Deploy contract. Private function?
   * @param   abi
   * @param   binary of the solidity contract
   * @return  address | err The owner's of the contract
   */
  _deployContractAsync = async (abi, unlinked_binary) => {

    const MyContract = contract({
      abi,
      unlinked_binary,
    })

    const provider = await this._web3Wrapper.currentProvider

    MyContract.setProvider(provider)

    try {
      const contractDeployed = await MyContract.new({from: "0x55350bbaffbc417f48c6a238d03afff708b9bc5a", gas: 4500000})
      return contractDeployed.address
    } catch (e) {
      console.log('error deploy')
      return e
    }
  }
}

export default ContractWrapper;
