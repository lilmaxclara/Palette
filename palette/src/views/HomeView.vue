<template>
<div class="flex justify-center">
  <div class="max-w-5xl w-full">
    <homeBar></homeBar>
    <imageDisplay></imageDisplay> 
    <frameDisplay></frameDisplay>
    <searchBar></searchBar>
    
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import homeBar from '@/components/homeBar'
import imageDisplay from '@/components/imageDisplay';
import frameDisplay from '@/components/frameDisplay';
import searchBar from '@/components/searchBar';

export default {
  name: 'HomeView',
  components: {
    homeBar,
    imageDisplay,
    frameDisplay,
    searchBar
  }
}
</script>
