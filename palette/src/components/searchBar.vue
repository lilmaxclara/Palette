<template>
  <button @click="this.$refs.clearInput">test</button>
  <div class="flex justify-center">
    <div class="flex justify-center w-full p-4">
      <SimpleTypeahead
        class="w-full px-4 py-4 rounded-l-lg"
        id="typeahead_id"
        placeholder="Search for a makeup palette or click submit to skip..."
        :items="this.searchList"
        :minInputLength="1"
        :itemProjection="itemProjectionFunction"
        @selectItem="selectItemEventHandler"
        @onInput="onInputEventHandler"
        @onFocus="onFocusEventHandler"
        @onBlur="onBlurEventHandler"
      >
      </SimpleTypeahead>
      <button @click="fireEvent" class="flex justify-center bg-green-400 rounded-r-lg px-8 py-4">Submit</button>
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
    const response = await axios.get("http://localhost:22887/pallet/list");
    this.searchList = response.data;
  },
  methods: {
    selectItemEventHandler(item) {
      this.selectedItem = item;
    },
    fireEvent(){
      this.$emit('newSelectedItem',this.selectedItem);
    }
  }
};
</script>
