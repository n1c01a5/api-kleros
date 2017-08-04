import * as _ from 'lodash';
import contract from 'truffle-contract';
import * as TokenArtifact from '../artifact/Token.json';
import web3Wrapper from '../util/web3Wrapper';

let TokenContract = async () => {
  const c = await contract(TokenArtifact);

  this._name = 'Token contract';

  return c;
};

let instantiateContractIfExistsAsync = async (artifact, address) => {
  const c = await contract(artifact);
  const providerObj = web3Wrapper.getCurrentProvider();

  c.setProvider(providerObj);

  const networkIdIfExists = await web3Wrapper.getNetworkIdIfExistsAsync();
  const artifactNetworkConfigs = _.isUndefined(networkIdIfExists) ?
                                 undefined :
                                 artifact.networks[networkIdIfExists];

  let contractAddress;

  if (!_.isUndefined(address)) {
    contractAddress = address;
  } else if (!_.isUndefined(artifactNetworkConfigs)) {
    contractAddress = artifactNetworkConfigs.address;
  }

  if (!_.isUndefined(contractAddress)) {
    const doesContractExist = await web3Wrapper.doesContractExistAtAddressAsync(contractAddress);

    if (!doesContractExist) {
      throw new Error('Error.ContractDoesNotExist');
    }
  }

  try {
    const contractInstance = _.isUndefined(address) ? await c.deployed() : await c.at(address);

    return contractInstance;
  } catch (err) {
    const errMsg = `${err}`;

    if (_.includes(errMsg, 'not been deployed to detected network')) {
      throw new Error('Error.ContractDoesNotExist');
    } else {
      throw new Error('Error.UnhandledError');
    }
  }
};

export {instantiateContractIfExistsAsync, TokenContract};
