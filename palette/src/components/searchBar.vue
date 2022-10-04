<template>
  <div>
    <SimpleTypeahead
      id="typeahead_id"
      placeholder="Start writing..."
      :items="this.searchList"
      :minInputLength="1"
      :itemProjection="itemProjectionFunction"
      @selectItem="selectItemEventHandler"
      @onInput="onInputEventHandler"
      @onFocus="onFocusEventHandler"
      @onBlur="onBlurEventHandler"
    >
    </SimpleTypeahead
    >>
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
    };
  },
  props: {
    msg: String,
  },
  components: {
    SimpleTypeahead,
  },
  async mounted(){
    //use axios to get the searchList and convert to json to array 
    const response = await axios.get("http://localhost:22887/pallet/list");
    this.searchList = response.data;
  },
};
</script>
