<template>
<div class="flex justify-center">
  <div class="max-w-5xl w-full">
    <homeBar></homeBar>
    <imageDisplay :imageURL="this.currentImageURL" ></imageDisplay> 
    <frameDisplay :frameNumber="this.currentFrame"></frameDisplay>
    <!-- <searchBar @newSelectedItem="(event) => this.selectedItem = event"></searchBar> -->
    <searchBar @newSelectedItem="checkGuess($event)"></searchBar>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import homeBar from '@/components/homeBar'
import imageDisplay from '@/components/imageDisplay';
import frameDisplay from '@/components/frameDisplay';
import searchBar from '@/components/searchBar';
const axios = require("axios").default;

export default {
  name: 'HomeView',
  data() {
    return {
      selectedItem: "",
      currentGameNumber: "",
      currentImageURL: "",
      currentFrame: 1,
      makeupURL: "",
      gameWinningGuess: "",
      gameWonStatus: false,
    }
  },
  components: {
    homeBar,
    imageDisplay,
    frameDisplay,
    searchBar
  },
  async mounted() {
    //use axios to get the searchList and convert to json to array

    //calculate current game by taking a base date and adding the number of days since that date
    //this will be used to calculate the current game
    const baseDate = new Date("2022-10-08");
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - baseDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.currentGameNumber = diffDays;

    try {
      const response = await axios.get("http://localhost:22887/games/"+this.currentGameNumber+"/result.txt");
      var gameData = response.data;
      this.gameWinningGuess = gameData.winner;
      this.makeupURL = gameData.URL;

    } catch (error) {
      console.log(error);
      return
    }
    this.currentImageURL = "http://localhost:22887/games/"+this.currentGameNumber+"/"+ this.currentFrame +".png"
  },
  methods: {
    checkGuess(event){
      this.selectedItem = event;
      if(this.selectedItem == this.gameWinningGuess){
        this.gameWonStatus = true;
      }
      else{
        this.gameWonStatus = false;
        this.currentFrame ++;
        this.currentImageURL = "http://localhost:22887/games/"+this.currentGameNumber+"/"+ this.currentFrame +".png"
      }
    },
  }
}
</script>
