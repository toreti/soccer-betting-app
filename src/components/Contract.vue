<template>
  <fieldset>
    <legend>Contract</legend>
    <fieldset>
      <legend>Add game</legend>
      <div>
        <label for="teamA">Team A:</label>
        <input v-model="newGame.game.teamA" id="teamA"/>
      </div>
      <div>
        <label for="teamB">Team B:</label>
        <input v-model="newGame.game.teamB" id="teamB"/>
      </div>
      <div>
        <label for="date">Date:</label>
        <input v-model="newGame.game.date" id="date"/>
      </div>
      <div>
        <label for="token">Token:</label>
        <input v-model="newGame.game.token" id="token"/>
      </div>
      <div>
        <button @click="save" :disabled="newGame.saving">
          {{ newGame.saving ? 'Saving...' : 'Save' }}
        </button>
      </div>
    </fieldset>
  </fieldset>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      newGame: {
        game: {
          teamA: null,
          teamB: null,
          date: null,
          token: null,
        },
        saving: false,
      },
    }
  },
  computed: {
    ...mapState({
      account: state => state.account,
      contract: state => state.contract,
      token: state => state.token,
      web3: state => state.web3,
    })
  },
  methods: {
    save() {
      this.newGame.saving = true
      this.contract.methods
          .addGame(this.newGame.game.teamA, this.newGame.game.teamB, this.newGame.game.date, this.newGame.game.token)
          .send({from: this.account, gas: 1000000})
          .on('sending', payload => console.log('sending', payload))
          .on('sent', payload => console.log('sent', payload))
          .on('transactionHash', transactionHash => console.log('transactionHash', transactionHash))
          .on('receipt', receipt => console.log('receipt', receipt))
          .on('confirmation', (confirmationNumber, receipt, latestBlockHash) => {
            console.log('confirmation', confirmationNumber, receipt, latestBlockHash)
            this.newGame.saving = false
          })
          .on('error', (error, receipt) => {
            console.log('error', error, receipt)
            this.newGame.saving = false
          })
    }
  }
}
</script>

<style>
</style>
