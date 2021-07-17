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
      <list-bets/>
    </fieldset>
  </fieldset>
</template>

<script>
import AddBet from '@/components/contract/AddBet'
import AddGame from '@/components/contract/AddGame'
import CloseBets from '@/components/contract/CloseBets'
import FinishGame from '@/components/contract/FinishGame'
import ListBets from '@/components/contract/ListBets'
import ListGames from '@/components/contract/ListGames'

export default {
  components: {
    AddBet,
    AddGame,
    CloseBets,
    FinishGame,
    ListBets,
    ListGames,
  }
}
</script>
