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
    <bet/>
  </fieldset>
</template>

<script>
import AddGame from '@/components/contract/AddGame'
import CloseBets from '@/components/contract/CloseBets'
import ListGames from '@/components/contract/ListGames'
import Bet from '@/components/Bet'
import FinishGame from "@/components/contract/FinishGame";

export default {
  components: {
    FinishGame,
    AddGame,
    CloseBets,
    ListGames,
    Bet,
  }
}
</script>
