<template>
  <div
    v-if="guessArray.length"
    class="flex-col justify-center m-4 text-black"
  >
    <div class="flex flex-col justify-center">
      <div 
        v-for="guess in guessArray"
        :key="guess"
        class="py-3 w-full border-2 border-black rounded-lg text-black m-1"
        @click="guessClick(guess)"
      >
        {{ guess }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "guessDisplay",
  props: {
    guessArray: Array,
  },
};
</script>
