<template>
  <div
    v-if="(guessArray.length && !checkFirstGuessWin())"
    class="flex-col justify-center mx-4 text-black"
  >
    <div class="flex flex-col justify-center">
      <div 
        v-for="guessElement in guessArray"
        :key="guessElement"
        class="flex justify-center py-3 my-1 w-full border-2 border-purple-300 rounded-lg text-black"
      >
      {{ guessElement.guess}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "guessDisplay",
  data() {
    return {

    };
  },
  props: {
    guessArray: Array,
    gameWonStatus: Boolean,
  },
  methods: {
    checkFirstGuessWin(){
      if (this.guessArray.length === 1 && this.gameWonStatus) {
        return true
      }
    }
  },
};
</script>
