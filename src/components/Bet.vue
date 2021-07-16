<template>
  <fieldset>
    <legend>Bet</legend>
    <fieldset>
      <legend>Add bet</legend>
      <div>
        <label for="accountUser">Account:</label>
        <input id="accountUser" v-model="accountUser"/>
      </div>
      <div>
        <label for="game">Game:</label>
        <select id="game" v-model="game">
          <option v-for="game in gamesList.list" v-bind:value="game.hash" :key="game.date">
            {{ game.teamA }} x {{ game.teamB }}
          </option>
        </select>
      </div>
      <div>
        <label for="result">Result:</label>
        <select id="result" v-model="result">
          <option value="0">Team A</option>
          <option value="1">Team B</option>
          <option value="2">Tie</option>
        </select>
      </div>
      <div>
        <label for="amount">Amount:</label>
        <input id="amount" v-model="amount"/>
      </div>
      <div>
        <button @click="add" :disabled="adding">
          {{ adding ? 'Adding...' : 'Add' }}
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
      adding: false,
      accountUser: null,
      game: null,
      result: null,
      amount: null,
      gamesList: {
        loading: false,
        list: [],
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
    add() {
      this.adding = true
      this.contract.methods
          .addBet(this.game, this.result, this.amount)
          .send({from: this.accountUser, gas: 1000000})
          .on('confirmation', (confirmationNumber, receipt, latestBlockHash) => {
            console.log('confirmation', confirmationNumber, receipt, latestBlockHash)
            this.adding = false
          })
          .on('error', (error, receipt) => {
            console.error('error', error, receipt)
            this.adding = false
          })
    }
  }
}
</script>

<style>
</style>
