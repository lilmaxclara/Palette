<template>
  <div class="flex justify-center">
    <div class="flex justify-center w-full p-4">
      <SimpleTypeahead
        ref="refSimpleTypeahead"
        class="w-full px-4 py-4 rounded-l-lg z-0"
        id="typeahead_id"
        placeholder="Search makeup palettes"
        :items="this.searchList"
        :minInputLength="1"
        :itemProjection="itemProjectionFunction"
        @selectItem="selectItemEventHandler"
        @onInput="onInputEventHandler"
        @onFocus="onFocusEventHandler"
        @onBlur="onBlurEventHandler"
        @keydown.enter="fireEvent"
      >
      </SimpleTypeahead>
      
      <button @click="fireEvent" class="flex justify-center bg-purple-300 rounded-r-lg px-3 py-4 sm:px-8 font-bold hover:bg-purple-400">Submit</button>
    </div>
  </div>
</template>

<script>
import SimpleTypeahead from "vue3-simple-typeahead";
const axios = require("axios").default;
import "vue3-simple-typeahead/dist/vue3-simple-typeahead.css"; //Optional default CSS

export default {
  name: "searchBar",
  data() {
    return {
      searchList: [],
      selectedItem: ""
    };
  },
  props: {
    msg: String,
  },
  components: {
    SimpleTypeahead,
  },
  async mounted() {
    //use axios to get the searchList and convert to json to array
    const response = await axios.get("https://palette.wtf/palette/list");
    this.searchList = response.data;
  },
  methods: {
    selectItemEventHandler(item) {
      this.selectedItem = item;
    },
    fireEvent(){
      this.selectedItem = this.selectedItem.trim()
      this.$emit('newSelectedItem',this.selectedItem);
      this.$refs.refSimpleTypeahead.input = ""
      this.selectedItem = ""
    }
  }
};
</script>

<style>

@media only screen and (max-width: 600px) {

  .simple-typeahead .simple-typeahead-list{
  position: absolute ;
  bottom: 56px ;
}
.simple-typeahead{
  position: relative;
}

}

</style>
