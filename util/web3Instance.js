import * as _ from 'lodash';
import Web3 from 'web3';

let web3Instance = async () => {
  if (!_.isUndefined(global.window)) {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    await window.addEventListener('load', () => {
      const web3 = window.web3;

      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (_.isUndefined(web3)) {
        // Use Mist/MetaMask's provider.
        return new Web3(web3.currentProvider);
      }

      return web3
    })
  }

  // Fallback to localhost if no web3 injection.
  const providerWeb3 = await new Web3.providers.HttpProvider('http://localhost:8545')

  const web3 = new Web3(providerWeb3)

  console.log('No web3 instance injected, using Local web3.')

  return web3
}

let providerWeb3 = async () => {
  if (!_.isUndefined(global.window)) {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    await window.addEventListener('load', () => {
      const web3 = window.web3

      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (_.isUndefined(web3)) {
        // Use Mist/MetaMask's provider.
        return web3.currentProvider
      }

      return providerWeb3
    })
  }

  // Fallback to localhost if no web3 injection.
  const providerWeb3 = await new Web3.providers.HttpProvider('http://localhost:8545');

  return providerWeb3
}

export {web3Instance, providerWeb3}
