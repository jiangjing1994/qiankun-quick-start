<template>
  <div id="app" class="theme-default">
    <router-view :key="key"/>
  </div>
</template>
<script>


export default {
  computed: {
    key() {
      return this.$route.path + Math.random()
    }
  }
}
</script>


<style lang="scss">
  @import '~@/assets/style/public-class.scss';
</style>
