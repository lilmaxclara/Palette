<template>
  <div class="m-4 p-4 flex justify-center bg-purple-200 rounded-lg">
    <div class="flex justify-center">
        <div
          v-if="showSpinner"
          class="lds-dual-ring rounded-lg"
        ></div>
        <img
          v-show="showSpinner === false"
          @load="showSpinner = false"
          class="rounded-xl"
          rel="preload"
          as="image"
          :src="this.imageURL"
          alt=""
          width="400"
          height="450"
        />
    </div>
  </div>
</template>

<script>
export default {
  name: "imageDisplay",
  data() {
    return {
      showSpinner: true,
    };
  },
  props: {
    imageURL: String,
  },
};
</script>

<style>
.lds-dual-ring {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;

}
.lds-dual-ring:after {
  content: " ";
  display: flex;
  width: 256px;
  height: 256px;
  margin: 16px;
  border-radius: 50%;
  border: 24px solid #fff;
  border-color: #d8b4fe transparent #d8b4fe transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
