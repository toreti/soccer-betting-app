<template>
  <fieldset>
    <legend>Faucet</legend>
    <fieldset>
      <legend>Token</legend>
      <div>Address: <strong>{{ token.address }}</strong></div>
      <div>Owner: <strong>{{ token.owner }}</strong></div>
      <div>Name: <strong>{{ token.name }}</strong></div>
      <div>Symbol: <strong>{{ token.symbol }}</strong></div>
      <div>Decimals: <strong>{{ token.decimals }}</strong></div>
      <div>Total supply: <strong>{{ formatFromWei(token.totalSupply) }} {{ token.symbol }}</strong></div>
    </fieldset>
    <fieldset>
      <legend>Transfer</legend>
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
import {mapState, mapActions} from 'vuex'

export default {
  data() {
    return {
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
      web3: state => state.web3,
    }),
    ...mapState('faucet', {
      token: state => state.token,
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
    ...mapActions('faucet', ['detailToken']),
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
    this.detailToken()
    this.getBalance()
  }
}
</script>

<style>
</style>
