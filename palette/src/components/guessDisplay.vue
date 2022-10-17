<template>
  <div
    v-if="guessArray.length"
    class="flex-col justify-center mx-4 text-black"
  >
    <div class="flex flex-col justify-center">
      <div 
        v-for="guess in guessArray"
        :key="guess"
        class="flex justify-center py-3 my-1 w-full border-2 border-black rounded-lg text-black"
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
