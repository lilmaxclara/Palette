<template>

    <div class="flex justify-center gap-2 mt-1 mb-2 text-black">
        <button class="bg-fuchsia-500 px-2 py-1 sm:text-4xl rounded px-3 py-2 ">1</button> 
    </div>

</template>
  
  <script>
  export default {
    name: "guessDisplay",
    props: {
      msg: String,
    },
  };
  </script>