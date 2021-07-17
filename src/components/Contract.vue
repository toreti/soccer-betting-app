<template>
  <fieldset>
    <legend>Contract</legend>
    <add-game/>
    <list-games/>
    <fieldset>
      <legend>Actions</legend>
      <close-bets/>
      <finish-game/>
    </fieldset>
    <fieldset>
      <legend>Bet</legend>
      <add-bet/>
    </fieldset>
  </fieldset>
</template>

<script>
import AddBet from '@/components/contract/AddBet'
import AddGame from '@/components/contract/AddGame'
import CloseBets from '@/components/contract/CloseBets'
import FinishGame from '@/components/contract/FinishGame'
import ListGames from '@/components/contract/ListGames'

export default {
  components: {
    AddBet,
    AddGame,
    CloseBets,
    FinishGame,
    ListGames,
  }
}
</script>
