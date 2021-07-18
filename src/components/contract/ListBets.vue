<template>
  <fieldset>
    <legend>Bets Total</legend>
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
        <td>{{ formatFromWei(betsTotal[0]) }}</td>
        <td>{{ formatFromWei(betsTotal[1]) }}</td>
        <td>{{ formatFromWei(betsTotal[2]) }}</td>
      </tr>
      </tbody>
    </table>
  </fieldset>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {GET_BETS_TOTAL_ACTION} from '@/store/modules/bet/types'
import {fromWei} from '@/contracts'

export default {
  computed: {
    ...mapState('bet', {
      betsTotal: state => state.betsTotal,
    })
  },
  methods: {
    ...mapActions('bet', {
      'getBetsTotal': GET_BETS_TOTAL_ACTION,
    }),
    formatFromWei(value) {
      return fromWei(value)
    }
  },
  mounted() {
    const game = '0xaa20ed60319e1287bd551eb465dd8333389ef0bd3e0b6c2160f885afb8258015'
    this.getBetsTotal(game)
  }
}
</script>
