<template>
  <fieldset>
    <legend>Token</legend>
    <div>Address: <strong>{{ token.address }}</strong></div>
    <div>Owner: <strong>{{ owner }}</strong></div>
    <div>Name: <strong>{{ name }}</strong></div>
    <div>Symbol: <strong>{{ symbol }}</strong></div>
    <div>Decimals: <strong>{{ decimals }}</strong></div>
    <div>Total supply: <strong>{{ formatFromWei(totalSupply) }} {{ symbol }}</strong></div>
    <br>
    <fieldset>
      <legend>Faucet</legend>
      <div>
        <label for="address">Address:</label>
        <input v-model="user.address" v-on:keyup="getBalance" id="address"/>
        {{ isValidAddress ? 'valid' : 'invalid' }}
      </div>
      <div>
        <label for="amount">Amount:</label>
        <input v-model="faucet.amount" id="amount"/>
      </div>
      <div>
        <button @click="transfer" :disabled="!canTransfer">
          {{ faucet.transferring ? 'Transferring...' : 'Transfer' }}
        </button>
      </div>
      <br>
      <fieldset>
        <legend>Balance</legend>
        <div>{{ formatFromWei(user.balance) }} TEST</div>
      </fieldset>
    </fieldset>
  </fieldset>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      address: null,
      owner: null,
      totalSupply: null,
      decimals: null,
      symbol: null,
      name: null,
      faucet: {
        amount: 1,
        transferring: false,
      },
      user: {
        address: '0xAC1Fc67b66d9C7c43C3dE6639A5052f90f304d47',
        balance: 0,
      }
    }
  },
  computed: {
    ...mapState({
      account: state => state.account,
      token: state => state.token,
      web3: state => state.web3,
    }),
    canTransfer() {
      return this.isValidAddress && this.isValidAmount && !this.faucet.transferring
    },
    isValidAddress() {
      return this.web3.utils.isAddress(this.user.address)
    },
    isValidAmount() {
      return !Number.isNaN(this.faucet.amount) && this.faucet.amount > 0
    },
  },
  methods: {
    formatFromWei: function (value) {
      return value ? this.web3.utils.fromWei(value.toString()) : 0
    },
    formatToWei: function (value) {
      return value ? this.web3.utils.toWei(value.toString()) : 0
    },
    getBalance: function () {
      if (this.isValidAddress) {
        this.token.contract.methods.balanceOf(this.user.address)
            .call()
            .then(result => this.user.balance = result)
            .catch(error => console.log(error))
      }
    },
    transfer() {
      this.faucet.transferring = true
      this.token.contract.methods
          .transfer(this.user.address, this.formatToWei(this.faucet.amount))
          .send({from: this.account, gas: 1000000})
          .on('sending', payload => console.log('sending', payload))
          .on('sent', payload => console.log('sent', payload))
          .on('transactionHash', transactionHash => console.log('transactionHash', transactionHash))
          .on('receipt', receipt => console.log('receipt', receipt))
          .on('confirmation', (confirmationNumber, receipt, latestBlockHash) => {
            console.log('confirmation', confirmationNumber, receipt, latestBlockHash)
            this.faucet.transferring = false
            this.getBalance()
          })
          .on('error', (error, receipt) => {
            console.log('error', error, receipt)
            this.faucet.transferring = false
          })
    }
  },
  mounted() {
    this.token.contract.methods.getOwner().call().then(result => this.owner = result)
    this.token.contract.methods.totalSupply().call().then(result => this.totalSupply = result)
    this.token.contract.methods.decimals().call().then(result => this.decimals = result)
    this.token.contract.methods.symbol().call().then(result => this.symbol = result)
    this.token.contract.methods.name().call().then(result => this.name = result)
    this.getBalance()
  }
}
</script>

<style>
</style>
