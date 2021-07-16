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
    <fieldset>
      <legend>List games</legend>
      <div v-if="gamesList.loading">
        <strong>Loading...</strong>
      </div>
      <table v-if="!gamesList.loading">
        <thead>
        <tr>
          <th>Match</th>
          <th>Date</th>
          <th>Open</th>
          <th>Finished</th>
          <th>Result</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="game in gamesList.list" :key="game.date">
          <td v-bind:title="game.hash">{{ game.teamA }} x {{ game.teamB }}</td>
          <td>{{ game.date }}</td>
          <td>{{ game.open }}</td>
          <td>{{ game.finished }}</td>
          <td>{{ game.result }}</td>
        </tr>
        </tbody>
      </table>
    </fieldset>
    <fieldset>
      <legend>Actions</legend>
      <fieldset>
        <legend>Close bets</legend>
        <div>
          <label for="game">Game:</label>
          <select id="game" v-model="closeBet.game">
            <option v-for="game in gamesList.list" v-bind:value="game.hash" :key="game.date">
              {{ game.teamA }} x {{ game.teamB }}
            </option>
          </select>
        </div>
        <div>
          <button @click="close">Close</button>
        </div>
      </fieldset>
      <fieldset>
        <legend>Finish game</legend>
        <div>
          <label for="finishGame">Game:</label>
          <select id="finishGame" v-model="finishGame.game">
            <option v-for="game in gamesList.list" v-bind:value="game.hash" :key="game.date">
              {{ game.teamA }} x {{ game.teamB }}
            </option>
          </select>
        </div>
        <div>
          <label for="finishResult">Result:</label>
          <select id="finishResult" v-model="finishGame.result">
            <option value="0">Team A</option>
            <option value="1">Team B</option>
            <option value="2">Tie</option>
          </select>
        </div>
        <div>
          <button @click="finish">Finish</button>
        </div>
      </fieldset>
    </fieldset>
    <bet/>
  </fieldset>
</template>

<script>
import {mapState} from 'vuex'
import Bet from "@/components/Bet";

export default {
  components: {
    Bet,
  },
  data() {
    return {
      gamesList: {
        loading: false,
        list: [],
      },
      newGame: {
        game: {
          teamA: null,
          teamB: null,
          date: null,
          token: null,
        },
        saving: false,
      },
      closeBet: {
        game: null,
        closing: false,
      },
      finishGame: {
        game: null,
        result: null,
        finishing: false,
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
    listGames() {
      this.gamesList.loading = true
      this.contract.methods.getGamesAddress().call().then(hashs => {
        this.gamesList.list = []
        this.gamesList.loading = false
        hashs.forEach(hash => {
          this.contract.methods.getGame(hash).call().then(game => {
            this.gamesList.list.push(game)
          })
        })
      })
    },
    close() {
      this.closing = true
      this.contract.methods
          .closeBets(this.closeBet.game)
          .send({from: this.account, gas: 1000000})
          .then(() => {
            this.closing = false
            this.listGames()
          })
    },
    finish() {
      this.finishing = true
      this.contract.methods
          .setResult(this.finishGame.game, this.finishGame.result)
          .send({from: this.account, gas: 1000000})
          .then(() => {
            this.finishing = false
            this.listGames()
          })
    },
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
            this.listGames()
          })
          .on('error', (error, receipt) => {
            console.log('error', error, receipt)
            this.newGame.saving = false
            this.listGames()
          })
    }
  },
  mounted() {
    this.listGames()
  }
}
</script>

<style>
</style>
