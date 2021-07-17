<template>
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
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {CLOSE_GAME_ACTION} from '@/store/modules/contract/types'

export default {
  data() {
    return {
      closeGameData: {
        game: null,
      }
    }
  },
  computed: {
    ...mapState('contract', {
      closingGame: state => state.closingGame,
      games: state => state.games,
    }),
  },
  methods: {
    ...mapActions('contract', {
      'closeGame': CLOSE_GAME_ACTION,
    }),
    close() {
      this.closeGame(this.closeGameData.game);
    }
  }
}
</script>
