<template>
  <fieldset>
    <legend>Contract</legend>
    <fieldset>
      <legend>Add game</legend>
      <div>
        <label for="teamA">Team A:</label>
        <input v-model="newGameData.teamA" id="teamA"/>
      </div>
      <div>
        <label for="teamB">Team B:</label>
        <input v-model="newGameData.teamB" id="teamB"/>
      </div>
      <div>
        <label for="date">Date:</label>
        <input v-model="newGameData.date" id="date"/>
      </div>
      <div>
        <label for="token">Token:</label>
        <input v-model="newGameData.token" id="token"/>
      </div>
      <div>
        <button @click="save" :disabled="addingGame">
          {{ addingGame ? 'Saving...' : 'Save' }}
        </button>
      </div>
    </fieldset>
    <fieldset>
      <legend>List games</legend>
      <div v-if="loadingGames">
        <strong>Loading...</strong>
      </div>
      <table v-if="!loadingGames">
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
        <tr v-for="game in games" :key="game.hash">
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
          <select id="game" v-model="closeGameData.game">
            <option v-for="game in games" v-bind:value="game.hash" :key="game.hash">
              {{ game.teamA }} x {{ game.teamB }}
            </option>
          </select>
        </div>
        <div>
          <button @click="close" :disabled="closingGame">
            {{ closingGame ? 'Closing...' : 'Close' }}
          </button>
        </div>
      </fieldset>
      <fieldset>
        <legend>Finish game</legend>
        <div>
          <label for="finishGameData">Game:</label>
          <select id="finishGameData" v-model="finishGameData.game">
            <option v-for="game in games" v-bind:value="game.hash" :key="game.hash">
              {{ game.teamA }} x {{ game.teamB }}
            </option>
          </select>
        </div>
        <div>
          <label for="finishResult">Result:</label>
          <select id="finishResult" v-model="finishGameData.result">
            <option value="0">Team A</option>
            <option value="1">Team B</option>
            <option value="2">Tie</option>
          </select>
        </div>
        <div>
          <button @click="finish" :disabled="finishingGame">
            {{ finishingGame ? 'Finishing...' : 'Finish' }}
          </button>
        </div>
      </fieldset>
    </fieldset>
    <bet/>
  </fieldset>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {
  ADD_GAME_ACTION,
  CLOSE_GAME_ACTION,
  FINISH_GAME_ACTION,
  LIST_GAMES_ACTION,
} from '@/store/modules/contract/types'
import Bet from '@/components/Bet'

export default {
  components: {
    Bet,
  },
  data() {
    return {
      newGameData: {
        teamA: null,
        teamB: null,
        date: null,
        token: null,
      },
      closeGameData: {
        game: null,
      },
      finishGameData: {
        game: null,
        result: null,
      },
    }
  },
  computed: {
    ...mapState('contract', {
      addingGame: state => state.addingGame,
      closingGame: state => state.closingGame,
      finishingGame: state => state.finishingGame,
      loadingGames: state => state.loadingGames,
      games: state => state.games,
    }),
  },
  methods: {
    ...mapActions('contract', {
      'addGame': ADD_GAME_ACTION,
      'closeGame': CLOSE_GAME_ACTION,
      'finishGame': FINISH_GAME_ACTION,
      'listGames': LIST_GAMES_ACTION,
    }),
    close() {
      this.closeGame(this.closeGameData.game);
    },
    finish() {
      this.finishGame({
        game: this.finishGameData.game,
        result: this.finishGameData.result,
      })
    },
    save() {
      this.addGame({
        teamA: this.newGameData.teamA,
        teamB: this.newGameData.teamB,
        date: this.newGameData.date,
        token: this.newGameData.token,
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
