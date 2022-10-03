<template>

    <div><SimpleTypeahead
	id="typeahead_id"
	placeholder="Start writing..."
	:items="['One','Two','Three']"
	:minInputLength="1"
	:itemProjection="itemProjectionFunction"
	@selectItem="selectItemEventHandler"
	@onInput="onInputEventHandler"
	@onFocus="onFocusEventHandler"
	@onBlur="onBlurEventHandler"
>
</SimpleTypeahead>></div>



</template>
  
  <script>
import SimpleTypeahead from 'vue3-simple-typeahead';
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'; //Optional default CSS

  export default {
    name: "searchBar",
    props: {
      msg: String,
    },
    components:{
        SimpleTypeahead,
    }
  };
  </script>
  