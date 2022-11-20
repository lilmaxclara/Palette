<template>
  <div class="m-4 p-4 flex justify-center bg-purple-200 rounded-lg">
    <div class="flex justify-center">
    <img class="rounded-xl" rel="preload" as="image" :src="this.imageURL" alt="Palette Image" width="400" height="450">
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: "imageDisplay",
    props: {
      imageURL: String,
    },
  };
  </script>
  