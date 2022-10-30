<template>
  <div class="flex justify-center">
    <div class="max-w-5xl w-full">
      <homeBar></homeBar>
      <div class="flex justify-center pt-10">
        <div class="text-4xl pb-10 font-bold">History</div>
      </div>
      <div class="flex mx-4 mb-4 justify-center">
        <div class="grid gap-2 grid-cols-3 sm:grid-cols-6">
          <div
              v-for="index in currentGameNumber"
              :key="index"
              @click="this.$router.push('/?game=' + index)"
              class="flex justify-center items-center p-12 rounded-lg bg-purple-300 text-black text-3xl font-semibold hover:bg-purple-400 cursor-pointer"
            >{{index}}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import homeBar from "@/components/homeBar";

export default {
  name: "HistoryView",
  data() {
    return {
      currentGameNumber: "",
    };
  },
  props: {

  },
  components: {
    homeBar,
  },
  methods: {

  },
  mounted() {
    const baseDate = new Date("2022-10-10");  
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - baseDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.currentGameNumber = diffDays;
    this.currentGameNumber --
  },
  
};
</script>