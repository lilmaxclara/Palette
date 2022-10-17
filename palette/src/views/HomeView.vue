<template>
  <div class="flex justify-center">
    <div class="max-w-5xl w-full">
      <homeBar></homeBar>
      <imageDisplay :imageURL="this.currentImageURL"></imageDisplay>
      <frameDisplay
        @frameClick="changeFrame($event)"
        :frameNumber="this.currentFrame"
      ></frameDisplay>
      <div v-if="!this.gameWonStatus">
        <searchBar @newSelectedItem="checkGuess($event)"></searchBar>
        <guessDisplay :guessArray="this.guessArray"></guessDisplay>
      </div>
      <div v-else>
        <div class="bg-fuchsia-200 rounded-lg m-4 p-2">
          <div class="text-4xl text-green-500 pb-2">You won!</div>
          <div class="flex flex-row justify-center gap-2 py-2">
            <div
              v-for="guess in guessArray"
              :key="guess"
              class="p-4 rounded-lg bg-red-500"
              :class="{'bg-green-500': guess === guessArray[guessArray.length - 1]}"
            >
            </div>
          </div>
          <div>
            <button>Share</button>
          </div>
          <div class="text-3xl">
            Buy the palette
            <a :href="this.makeupURL">{{ this.gameWinningGuess }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import homeBar from "@/components/homeBar";
import imageDisplay from "@/components/imageDisplay";
import frameDisplay from "@/components/frameDisplay";
import searchBar from "@/components/searchBar";
import guessDisplay from "@/components/guessDisplay";
const axios = require("axios").default;

export default {
  name: "HomeView",
  data() {
    return {
      selectedItem: "",
      currentGameNumber: "",
      currentImageURL: "",
      currentFrame: 1,
      makeupURL: "",
      guessArray: [],
      gameWinningGuess: "",
      gameWonStatus: false,
    };
  },
  components: {
    homeBar,
    imageDisplay,
    frameDisplay,
    searchBar,
    guessDisplay,
  },
  async mounted() {
    //use axios to get the searchList and convert to json to array

    //calculate current game by taking a base date and adding the number of days since that date
    //this will be used to calculate the current game
    const baseDate = new Date("2022-10-17");
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - baseDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.currentGameNumber = diffDays;
    console.log(this.currentGameNumber);

    try {
      const response = await axios.get(
        "http://localhost:22887/games/" + this.currentGameNumber + "/result.txt"
      );
      var gameData = response.data;
      this.gameWinningGuess = gameData.winner;
      this.makeupURL = gameData.URL;
    } catch (error) {
      console.log(error);
      return;
    }
    this.currentImageURL =
      "http://localhost:22887/games/" +
      this.currentGameNumber +
      "/" +
      this.currentFrame +
      ".png";
  },
  methods: {
    checkGuess(event) {
      this.selectedItem = event;
      if (this.selectedItem == this.gameWinningGuess) {
        this.gameWonStatus = true;
        this.guessArray.push("✔️ " + event);
      } else {
        this.gameWonStatus = false;
        this.guessArray.push("❌ " + event);
        this.currentFrame++;
        this.currentImageURL =
          "http://localhost:22887/games/" +
          this.currentGameNumber +
          "/" +
          this.currentFrame +
          ".png";
      }
    },
    changeFrame(event) {
      console.log(event);
      this.currentImageURL =
        "http://localhost:22887/games/" +
        this.currentGameNumber +
        "/" +
        event +
        ".png";
    },
    share(){
      
    }
  },
};
</script>
