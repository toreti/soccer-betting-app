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
        <input v-model="address" v-on:keyup="getRecipientBalance" id="address"/>
        {{ isValidAddress ? 'valid' : 'invalid' }}
      </div>
      <div>
        <label for="amount">Amount:</label>
        <input v-model="amount" id="amount"/>
      </div>
      <div>
        <button @click="transfer" :disabled="!canTransfer">
          {{ transferData.processing ? 'Transferring...' : 'Transfer' }}
        </button>
      </div>
      <br>
      <fieldset>
        <legend>Balance</legend>
        <div>{{ formatFromWei(recipient.balance) }} TEST</div>
      </fieldset>
    </fieldset>
  </fieldset>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import {
  RECIPIENT_ADDRESS_MUTATION,
  TRANSFER_AMOUNT_MUTATION,
  DETAIL_TOKEN_ACTION,
  GET_RECIPIENT_BALANCE_ACTION,
  TRANSFER_ACTION,
} from '@/store/modules/faucet/types'

export default {
  computed: {
    ...mapState({
      account: state => state.account,
      web3: state => state.web3,
    }),
    ...mapState('faucet', {
      token: state => state.token,
      recipient: state => state.recipient,
      transferData: state => state.transfer,
    }),
    address: {
      set(value) {
        this[RECIPIENT_ADDRESS_MUTATION](value)
      },
      get() {
        return this.recipient.address
      }
    },
    amount: {
      set(value) {
        this.setTransferAmount(value)
      },
      get() {
        return this.transferData.amount
      }
    },
    canTransfer() {
      return this.isValidAddress && this.isValidAmount && !this.transferData.processing
    },
    isValidAddress() {
      return this.web3.utils.isAddress(this.recipient.address)
    },
    isValidAmount() {
      return !Number.isNaN(this.transferData.amount) && this.transferData.amount > 0
    },
  },
  methods: {
    ...mapMutations('faucet', {
      'setRecipientAddress': RECIPIENT_ADDRESS_MUTATION,
      'setTransferAmount': TRANSFER_AMOUNT_MUTATION,
    }),
    ...mapActions('faucet', {
      'detailToken': DETAIL_TOKEN_ACTION,
      'getRecipientBalance': GET_RECIPIENT_BALANCE_ACTION,
      'transfer': TRANSFER_ACTION,
    }),
    formatFromWei: function (value) {
      return value ? this.web3.utils.fromWei(value.toString()) : 0
    },
    formatToWei: function (value) {
      return value ? this.web3.utils.toWei(value.toString()) : 0
    },
  },
  mounted() {
    this.detailToken()
    this.setRecipientAddress('0xAC1Fc67b66d9C7c43C3dE6639A5052f90f304d47')
    this.getRecipientBalance()
  }
}
</script>
