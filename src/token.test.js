/* global describe, it, before */
import web3Instance from '../util/web3Instance'
import TokenERC223Wrapper from '../contract_wrapper/TokenERC223Wrapper'
import TokenWeb3 from './token'
import Erc223Contract from '../contracts/ERC223_Token.sol'


test('TokenWeb3', async () => {
  let web3 = await web3Instance()
  let tokenWeb3 = new TokenWeb3(web3)
  let tokenERC223Wrapper = new TokenERC223Wrapper(web3)

  console.log(tokenWeb3.getWeb3Wrapper().getCoinbase())

  console.log(tokenWeb3.getWeb3Wrapper().getCoinbase())
  console.log(tokenWeb3.getWeb3Wrapper().getBalanceInWeiAsync())

  // console.log(test1.getBalanceInWeiAsync())
  // console.log(test1.getCoinbase())
  // console.log(test1.getWeb3Wrapper)
});
