<template>
  <fieldset>
    <legend>Add bet</legend>
    <div>
      <label for="account">Account:</label>
      <input id="account" v-model="account"/>
    </div>
    <div>
      <label for="game">Game:</label>
      <select id="game" v-model="game">
        <option v-for="game in games" v-bind:value="game.hash" :key="game.hash">
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
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {ADD_BET_ACTION} from '@/store/modules/bet/types'
import {toWei} from '@/contracts'

export default {
  data() {
    return {
      account: null,
      game: null,
      result: null,
      amount: null,
    }
  },
  computed: {
    ...mapState('bet', {
      adding: state => state.adding,
    }),
    ...mapState('contract', {
      games: state => state.games,
    })
  },
  methods: {
    ...mapActions('bet', {
      'addBet': ADD_BET_ACTION,
    }),
    add() {
      this.addBet({
        account: this.account,
        game: this.game,
        result: this.result,
        amount: toWei(this.amount),
      })
    }
  }
}
</script>
