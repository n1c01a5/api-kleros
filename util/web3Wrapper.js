import Web3 from 'web3';

let web3Wrapper = new Promise((resolve, reject) => {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', () => {
    let web3 = window.web3;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider);
      resolve(web3);
    } else {
      // Fallback to localhost if no web3 injection.
      let provider = new Web3.providers.HttpProvider('http://localhost:8545');

      web3 = new Web3(provider);
      console.log('No web3 instance injected, using Local web3.');
      resolve(web3);
    }
  });
});

export default web3Wrapper;
