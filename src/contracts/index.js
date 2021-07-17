import Web3 from 'web3'
import contractAbi from '@/contracts/contract'
import tokenAbi from '@/contracts/token'

// Addresses
const account = '0x924850779aF86Fd7A6FC8fc2F059Dd32BC0ECbD3'
const contractAddress = '0x4448c9a03c0f4E44Bb31ddbE8A575ebbabe991Aa'
const tokenAddress = '0xb40522068a89111ED350F8aCE4d64eA1ef5ba261'

// Contract instances
const web3 = new Web3('http://localhost:7545')
const contract = new web3.eth.Contract(contractAbi, contractAddress)
const tokenContract = new web3.eth.Contract(tokenAbi, tokenAddress)

export {
  web3,
  account,
  contract,
  tokenContract
}
