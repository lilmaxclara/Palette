<template>
  <div class="flex justify-center">
    <div class="max-w-5xl w-full">
      <homeBar></homeBar>
      <imageDisplay :imageURL="this.currentImageURL"></imageDisplay>
      <frameDisplay
        @frameClick="changeFrame($event)"
        :frameNumber="this.currentFrame" :gameWonStatus=this.gameWonStatus
      ></frameDisplay>
      <div v-if="!this.gameOverStatus">
        <searchBar @newSelectedItem="checkGuess($event)"></searchBar>
      </div>
      <div v-if="this.gameOverStatus & this.showGuess">
        <guessDisplay :guessArray="this.guessArray"></guessDisplay>
      </div>
      <div v-if="this.gameOverStatus">
        <div class="bg-purple-200 rounded-lg m-4 p-2">
          <div v-if="this.gameWonStatus" class="text-4xl text-green-500 pb-2">
            You won!
          </div>
          <div v-else class="text-4xl text-red-500 pb-2">You lost</div>
          <div class="text-3xl p-2">
            <a :href="this.makeupURL" target="_blank">{{
              this.gameWinningGuess
            }}</a>
          </div>
          <div class="flex flex-row justify-center gap-2 py-2">
            <div
              v-for="guess in guessArray"
              :key="guess"
              class="p-4 rounded-lg"
              :class="determineColour(guess)"
            ></div>
          </div>
          <div>
            <button
              @click="share()"
              class="py-3 px-4 bg-purple-300 rounded-lg text-black font-bold m-2 hover:bg-purple-400 active:translate-y-1"
            >
              {{ this.shareButtonText }}
            </button>
            <a :href="this.makeupURL" target="_blank">
              <button
                class="py-3 px-4 bg-green-300 rounded-lg text-black font-bold m-2 hover:bg-green-400"
              >
                BUY
              </button>
            </a>
          </div>
          <div v-if="this.currentFrame > 1">
            <button
              @click="this.showGuess = !this.showGuess"
              class="underline m-2"
            >
              Show/Hide Guesses
            </button>
          </div>
          <div class="flex flex-col justify-center p-2">
            <div class="text-2xl">Next Palette:</div>
            <VueCountdown
              class="font-bold text-xl"
              :time="this.endOfDay()"
              :transform="transformSlotProps"
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
      shareButtonText: "SHARE",
      showGuess: false,
      guessArray: [],
      gameWinningGuess: "",
      gameOverStatus: false,
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
    //calculate current game by taking a base date and adding the number of days since that date
    //this will be used to calculate the current game

    if (this.$route.query.game) {
      //dont do anything with local storage if we are in game mode
      console.log("Game Mode detected");
      this.currentGameNumber = this.$route.query.game;
    } else if (
      localStorage.getItem("currentFrame") &&
      this.getGameNumber() == JSON.parse(localStorage.getItem("lastGameNumber"))
    ) {
      //if we aren't in game mode, and see we are still on the previous game, load the previous game
      console.log("Loading previous game");
      this.currentGameNumber = JSON.parse(
        localStorage.getItem("lastGameNumber")
      );
      this.currentFrame = JSON.parse(localStorage.getItem("currentFrame"));
      this.guessArray = JSON.parse(localStorage.getItem("guessArray"));
      this.gameOverStatus = JSON.parse(localStorage.getItem("gameOverStatus"));
      this.gameWonStatus = JSON.parse(localStorage.getItem("gameWonStatus"));
    } else {
      //if we aren't in game mode, there is no local storage or we arent on the current game number then load the new game
      console.log("Loading new game");
      localStorage.clear();
      this.currentGameNumber = this.getGameNumber();
      localStorage.setItem(
        "lastGameNumber",
        JSON.stringify(this.currentGameNumber)
      );
    }

    //use axios to get the searchList and convert to json to array
    try {
      const response = await axios.get(
        "https://palette.wtf/games/" + this.currentGameNumber + "/result.txt"
      );
      var gameData = response.data;
      //remove trailing spaces
      this.gameWinningGuess = gameData.winner.trim();
      this.makeupURL = gameData.URL;
    } catch (error) {
      console.log(error);
      return;
    }
    this.currentImageURL =
      "https://palette.wtf/games/" +
      this.currentGameNumber +
      "/" +
      this.currentFrame +
      ".webp";

    this.cacheImages(this.currentGameNumber);
  },

  methods: {
    checkGuess(event) {
      // update localStorage

      this.selectedItem = event;
      if (this.selectedItem == this.gameWinningGuess) {
        this.gameWonStatus = true;
        this.gameOverStatus = true;
        this.guessArray.push({ guessResult: true, guess: "✔️ " + event });
        this.guessArray.length = 6;
        if (!this.$route.query.game) {
          localStorage.setItem(
            "gameWonStatus",
            JSON.stringify(this.gameWonStatus)
          );
          localStorage.setItem(
            "gameOverStatus",
            JSON.stringify(this.gameOverStatus)
          );
          localStorage.setItem("guessArray", JSON.stringify(this.guessArray));
        }
      } else {
        if (event == "") {
          this.guessArray.push({ guessResult: false, guess: "❌ Skipped" });
        } else {
          this.guessArray.push({ guessResult: false, guess: "❌ " + event });
        }

        if (!this.$route.query.game) {
          localStorage.setItem("guessArray", JSON.stringify(this.guessArray));
        }

        if (this.currentFrame == 6) {
          this.gameOverStatus = true;
          if (!this.$route.query.game) {
            localStorage.setItem(
              "gameOverStatus",
              JSON.stringify(this.gameOverStatus)
            );
          }
          return;
        }
        this.currentFrame++;
        this.currentImageURL =
          "https://palette.wtf/games/" +
          this.currentGameNumber +
          "/" +
          this.currentFrame +
          ".webp";

        //don't do anything if we are in archive mode
        if (!this.$route.query.game) {
          localStorage.setItem(
            "currentFrame",
            JSON.stringify(this.currentFrame)
          );
          localStorage.setItem(
            "gameWonStatus",
            JSON.stringify(this.gameWonStatus)
          );
          localStorage.setItem(
            "gameOverStatus",
            JSON.stringify(this.gameOverStatus)
          );
        }
      }
    },
    changeFrame(event) {
      this.currentImageURL =
        "https://palette.wtf/games/" +
        this.currentGameNumber +
        "/" +
        event +
        ".webp";
    },
    share() {
      this.shareButtonText = "COPIED";
      var shareString = "";
      for (var i = 0; i < this.guessArray.length; i++) {
        try {
          if (this.guessArray[i].guessResult) {
            shareString += "🟩";
          } else {
            shareString += "🟥";
          }
        } catch (error) {
          shareString += "⬛";
        }
      }
      var clipboardText =
        "Palette #" +
        this.currentGameNumber +
        "\n" +
        "💅" +
        shareString +
        "\n" +
        "https://palette.wtf";
      console.log(clipboardText);
      navigator.clipboard.writeText(clipboardText);
    },
    endOfDay() {
      //calculate minutes hours and seconds before the end of the day
      const currentDate = new Date();
      const tomorrow = new Date(currentDate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const diffTime = Math.abs(currentDate - tomorrow);
      return diffTime;
    },
    transformSlotProps(props) {
      //Add leading zeros to the time
      const formattedProps = {};

      Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ? `0${value}` : String(value);
      });

      return formattedProps;
    },
    determineColour(guess) {
      try {
        if (guess.guessResult) {
          return "bg-green-500";
        } else {
          return "bg-red-500";
        }
      } catch (error) {
        return "bg-gray-500";
      }
    },
    getGameNumber() {
      const baseDate = new Date("November 27, 2022 00:00:00");
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate - baseDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    },
    cacheImages(currentGameNumber) {
      //preloads images so transition between frames is instant
      for (var i = 1; i < 7; i++) {
        var img = new Image();
        img.src =
          "https://palette.wtf/games/" + currentGameNumber + "/" + i + ".webp";
      }
    },
  },
};
</script>
