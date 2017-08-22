/* global describe, it, before */
import web3Instance from '../util/web3Instance';
import TokenWeb3 from './token';


test('TokenWeb3', async () => {
  let web3 = await web3Instance();
  let tokenWeb3 = new TokenWeb3(web3)

  console.log(tokenWeb3.getWeb3Wrapper().getCoinbase())
  console.log(tokenWeb3.getWeb3Wrapper().getBalanceInWeiAsync())

  // console.log(test1.getBalanceInWeiAsync())
  // console.log(test1.getCoinbase())
  // console.log(test1.getWeb3Wrapper)
});
