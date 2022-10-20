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
      </div>
      <div v-if="!this.gameWonStatus || this.showGuess">
        <guessDisplay :guessArray="this.guessArray"></guessDisplay>
      </div>
      <div v-if="this.gameWonStatus">
        <div class="bg-fuchsia-200 rounded-lg m-4 p-2">
          <div class="text-4xl text-green-500 pb-2">You won!</div>
          <div class="text-3xl p-2">
            <a :href="this.makeupURL">{{ this.gameWinningGuess }}</a>
          </div>
          <div class="flex flex-row justify-center gap-2 py-2">
            <div
              v-for="guess in guessArray"
              :key="guess"
              class="p-4 rounded-lg bg-red-500"
              :class="{
                'bg-green-500': guess === guessArray[guessArray.length - 1],
              }"
              
            >Use a computed class here to switch between yes no and unknown guesses</div>
          </div>
          <div>
            <button
              class="py-3 px-4 bg-green-500 rounded-lg text-white font-bold m-2"
            >
              SHARE
            </button>
          </div>
          <div>
            <button
              @click="this.showGuess = !this.showGuess"
              class="underline m-2"
            >
              Show/Hide Guesses
            </button>
          </div>
          <div class="flex flex-col justify-center p-2">
            <div class="text-2xl">Next Palette:</div>
            <VueCountdown class="font-bold text-xl"
              :time=this.endOfDay() :transform="transformSlotProps" 
              v-slot="{ hours, minutes, seconds }"
            >
              {{ hours }}:{{ minutes }}:{{ seconds }}
            </VueCountdown>
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
import VueCountdown from "@chenfengyuan/vue-countdown";

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
      showGuess: false,
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
    VueCountdown,
  },
  async mounted() {
    //use axios to get the searchList and convert to json to array

    //calculate current game by taking a base date and adding the number of days since that date
    //this will be used to calculate the current game
    const baseDate = new Date("2022-10-20");
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
    share() {},
    endOfDay() {
      //calculate minutes hours and seconds before the end of the day
    const currentDate = new Date();
    const tomorrow = new Date(currentDate)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0,0,0,0)
    const diffTime = Math.abs(currentDate - tomorrow);
    return diffTime
    },
    transformSlotProps(props) {
      //Add leading zeros to the time
      const formattedProps = {};

      Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ? `0${value}` : String(value);
      });

      return formattedProps;
    },
  },
};
</script>
