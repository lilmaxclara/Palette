<template>
  <div
    v-if="guessArray.length"
    class="flex-col justify-center mx-4 text-black"
  >
    <div class="flex flex-col justify-center">
      <div 
        v-for="guessElement in guessArrayFilter"
        :key="guessElement"
        class="flex justify-center py-3 my-1 w-full border-2 border-purple-300 rounded-lg text-black"
        @click="guessClick(guessElement)"
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
      guessArrayFilter: this.guessArray.filter((element) => element),
    };
  },
  props: {
    guessArray: Array,
  },
};
</script>
