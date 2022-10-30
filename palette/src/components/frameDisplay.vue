<template>
  <div class="flex justify-center gap-2 mt-1 mb-2 text-black">
    <button 
      v-for="frame in frameNumber"
      :key="frame"
      class="bg-purple-300 text-2xl sm:text-4xl rounded px-3 py-2 hover:bg-purple-400"
      :class="{'bg-purple-400': frame === activeFrame}"
      @click="frameClickHandler(frame)"
    >
      {{ frame }}
    </button>
  </div>
</template>

<script>
export default {
  name: "frameDisplay",
  data () {
    return {
      activeFrame: Number,
    }
  },
  props: {
    frameNumber: String,
  },

  watch: {
    // whenever question changes, this function will run
    frameNumber() {
      this.activeFrame = this.frameNumber
    }
  },
  methods : {
    frameClickHandler(frame){
      this.$emit('frameClick',frame);
      this.activeFrame = frame;
    }
  }
};
</script>
