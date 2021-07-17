<template>
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
</template>

<script>
import {mapActions, mapState} from 'vuex'
import {LIST_GAMES_ACTION} from '@/store/modules/contract/types'

export default {
  computed: {
    ...mapState('contract', {
      loadingGames: state => state.loadingGames,
      games: state => state.games,
    }),
  },
  methods: {
    ...mapActions('contract', {
      'listGames': LIST_GAMES_ACTION,
    }),
  },
  mounted() {
    this.listGames()
  }
}
</script>
