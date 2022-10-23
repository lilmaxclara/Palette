<template>
  <div class="flex justify-center">
    <div class="max-w-5xl w-full">
      <homeBar></homeBar>
      <div class="flex justify-center pt-10">
        <div class="text-4xl pb-10 font-bold">History</div>
      </div>
      <div class="flex mx-4 justify-center">
        <div class="grid gap-2 grid-cols-6">
          <div
              v-for="index in currentGameNumber"
              :key="index"
              @click="router.push({ name: 'HistoryView', params: { gameNumber: index }})"
              class="flex justify-center items-center w-28 h-28 rounded-lg bg-slate-500 text-white text-3xl font-semibold hover:bg-slate-600 cursor-pointer"
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
    const baseDate = new Date("2022-10-13");
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - baseDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.currentGameNumber = diffDays;
    console.log(this.currentGameNumber);
  },
  
};
</script>