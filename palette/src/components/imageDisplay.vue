<template>
  <div class="m-4 p-4 flex justify-center bg-purple-300 rounded-lg">
    <div class="flex justify-center">
    <img class="rounded-xl" src="@/assets/testAsset.png" alt="Pallet Image" width="500" height="500">
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: "imageDisplay",
    props: {
      msg: String,
    },
  };
  </script>
  