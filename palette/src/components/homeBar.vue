<template>
  <header class="flex items-center justify-between mx-4 mt-2 text-grey">
    <div class="flex items-center gap-2 mt-3">
      <a href="."
        ><img class="rounded-md" src="@/assets/PaletteLogo.webp" alt=""
      /></a>
    </div>
    <div class="flex items-center gap-2 text-4xl">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mt-4 w-10 h-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        ></path>
      </svg>
      <svg
        @click="this.ToggleModal1 = true"
        xmlns="http://www.w3.org/2000/svg"
        class="mt-4 w-10 h-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        ></path>
      </svg>
      <svg
        @click="this.ToggleModal2 = true"
        xmlns="http://www.w3.org/2000/svg"
        class="mt-4 w-10 h-10"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    </div>
  </header>
  <modalDisplay
    v-if="ToggleModal1"
    @closeModal="this.ToggleModal1 = false"
  ></modalDisplay>
  <modalDisplay v-if="ToggleModal2" @closeModal="this.ToggleModal2 = false">
    <div class="flex justify-start pb-4 text-4xl font-bold">Instructions</div>
    <ul class="list-disc">
      <li>
        <p class="pb-2 text-left text-2xl">
          Each image shows an individual shade, guess the palette which that
          shade belongs to
        </p>
      </li>
      <li>
        <p class="pb-2 text-left text-2xl">
          Guessing wrong reveals the next shade in the palette
        </p>
      </li>
      <li>
        <p class="pb-2 text-left text-2xl">
          If you can't answer, just press the submit button and the next image
          will be shown
        </p>
      </li>
    </ul>

    <div class="flex justify-start pt-2 pb-4 text-4xl font-bold">Support</div>
    <div class="flex flex-row justify-center items-center gap-1">
      <div class="text-left text-2xl pb-4">
        Follow me on Twitter, and if you like the game, tweet about it!
      </div>
      <div class="flex justify-center h-fit">
        <a href="https://twitter.com"><button
          class="flex justify center p-4 rounded-xl w-fit text-white font-bold bg-blue-400 whitespace-nowrap"
        >Twitter 🐦
        </button></a>
        
      </div>
    </div>
  </modalDisplay>
</template>

<script>
import modalDisplay from "@/components/modalDisplay.vue";
export default {
  name: "homeBar",
  data() {
    return {
      ToggleModal1: false,
      ToggleModal2: false,
    };
  },
  props: {
    msg: String,
  },
  components: {
    modalDisplay,
  },
  methods: {
    closeModal() {},
  },
};
</script>
