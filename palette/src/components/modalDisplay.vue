<template>
    <div class="fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-black opacity-80">
        <div class="w-full h-full flex justify-center items-center">
          <div class="p-10 rounded-lg bg-white border-2 border-blue-200">
            <div>Hello</div>
            <div>This is a modal</div>
          </div>
        </div>
    </div>
</template>
    
    <script>
    export default {
      name: "modalDisplay",
      props: {
        imageURL: Number,
      },
    };
    </script>
    