<template>
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
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {FINISH_GAME_ACTION} from '@/store/modules/contract/types'

export default {
  data() {
    return {
      finishGameData: {
        game: null,
        result: null,
      }
    }
  },
  computed: {
    ...mapState('contract', {
      finishingGame: state => state.finishingGame,
      games: state => state.games,
    })
  },
  methods: {
    ...mapActions('contract', {
      'finishGame': FINISH_GAME_ACTION,
    }),
    finish() {
      this.finishGame({
        game: this.finishGameData.game,
        result: this.finishGameData.result,
      })
    }
  }
}
</script>
