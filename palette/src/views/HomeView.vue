<template>
<div class="flex justify-center">
  <div class="max-w-5xl w-full">
    <homeBar></homeBar>
    <imageDisplay></imageDisplay> 
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import homeBar from '@/components/homeBar'
import imageDisplay from '@/components/imageDisplay';

export default {
  name: 'HomeView',
  components: {
    homeBar,
    imageDisplay
  }
}
</script>
