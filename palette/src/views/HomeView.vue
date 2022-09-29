<template>
<div class="flex justify-center">
  <div class="w-3/5">
    <homeBar></homeBar> 
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import homeBar from '@/components/homeBar.vue'

export default {
  name: 'HomeView',
  components: {
    homeBar
  }
}
</script>
