<template>
  <div class="flex justify-center gap-2 mt-1 mb-2 text-black">
    <button
      v-for="frame in frameNumber"
      :key="frame"
      class="bg-fuchsia-500 px-2 py-1 sm:text-4xl rounded px-3 py-2"
    >
      {{ frame }}
    </button>
  </div>
</template>

<script>
export default {
  name: "frameDisplay",
  props: {
    frameNumber: String,
  },
};
</script>
