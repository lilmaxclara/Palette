<template>
  <header class="relative flex items-center justify-between mx-2 text-black">
    <div class="flex items-center gap-2 mt-3">
        <div>Logo</div>
        <div>❤️</div>
    </div>
    <div class="flex items-center gap-2">
      <div>🗓️</div>
      <div>📊</div>
      <div>❔</div>
    </div>
  </header>
</template>

<script>
export default {
  name: "homeBar",
  props: {
    msg: String,
  },
};
</script>
