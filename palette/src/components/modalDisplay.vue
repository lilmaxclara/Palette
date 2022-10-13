<template>
    <div v-if="this.showModal" class="fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-[rgba(0,0,0,0.5)]">
        <div @click="closeModal()" class="w-full h-full flex justify-center items-center">
          <div class="p-10 rounded-lg bg-white border-2 border-blue-200 max-w-xs sm:max-w-xl">
          <slot></slot>
          </div>
        </div>
    </div>
</template>
    
    <script>
    export default {
      name: "modalDisplay",
      data () {
        return {
          showModal: true,
        }
      },
      methods : {
        closeModal(){
          this.$emit('closeModal');
        }
      }
    };
    </script>
    