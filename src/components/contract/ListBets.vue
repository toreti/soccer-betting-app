<template>
  <fieldset>
    <legend>List games</legend>
    <table border="1" width="100%">
      <thead>
      <tr>
        <th width="33%">Team A</th>
        <th width="33%">Team B</th>
        <th>Tie</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{ betsTotal[0] }}</td>
        <td>{{ betsTotal[1] }}</td>
        <td>{{ betsTotal[2] }}</td>
      </tr>
      </tbody>
    </table>
  </fieldset>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {GET_BETS_TOTAL_ACTION} from '@/store/modules/bet/types'

export default {
  computed: {
    ...mapState('bet', {
      betsTotal: state => state.betsTotal,
    })
  },
  methods: {
    ...mapActions('bet', {
      'getBetsTotal': GET_BETS_TOTAL_ACTION,
    })
  },
  mounted() {
    const game = '0xaa20ed60319e1287bd551eb465dd8333389ef0bd3e0b6c2160f885afb8258015'
    this.getBetsTotal(game)
  }
}
</script>
