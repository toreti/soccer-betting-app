<template>
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
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {ADD_GAME_ACTION} from '@/store/modules/contract/types'

export default {
  data() {
    return {
      newGameData: {
        teamA: null,
        teamB: null,
        date: null,
        token: null,
      }
    }
  },
  computed: {
    ...mapState('contract', {
      addingGame: state => state.addingGame,
    })
  },
  methods: {
    ...mapActions('contract', {
      'addGame': ADD_GAME_ACTION,
    }),
    save() {
      this.addGame({
        teamA: this.newGameData.teamA,
        teamB: this.newGameData.teamB,
        date: this.newGameData.date,
        token: this.newGameData.token,
      })
    }
  }
}
</script>
