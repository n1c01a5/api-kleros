/* global describe, it, before */
import {web3Instance, providerWeb3} from '../util/web3Instance'
import TokenERC223Wrapper from '../contract_wrapper/TokenERC223_wrapper'
import ContractWrapper from '../contract_wrapper/contract_wrapper'
import TokenWeb3 from './token'
import TokenArtifact from '../artifact/Token.json'


test('TokenWeb3', async () => {
  let web3 = await web3Instance()
  let provider = await providerWeb3()
  console.log('ewfew', provider)
  let tokenWeb3 = new TokenWeb3(web3)
  let contractWrapper = new ContractWrapper(web3)
  let tokenERC223Wrapper = new TokenERC223Wrapper(web3)

  let deploy_contract = await contractWrapper._deployContractAsync(TokenArtifact.abi, TokenArtifact.unlinked_binary)
  console.log(deploy_contract)
  console.log(tokenWeb3.getWeb3Wrapper().getCoinbase())

  console.log(tokenWeb3.getWeb3Wrapper().getCoinbase())
  console.log(tokenWeb3.getWeb3Wrapper().getBalanceInWeiAsync())

  // console.log(test1.getBalanceInWeiAsync())
  // console.log(test1.getCoinbase())
  // console.log(test1.getWeb3Wrapper)
});
