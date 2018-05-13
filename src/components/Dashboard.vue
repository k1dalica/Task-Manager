<template>
  <div id="dashboard">
    <Navigation />

    <router-view />
  </div>
</template>

<script>
import Navigation from './common/Navigation'

export default {
  name: 'Dashboard',
  data: () => ({

  }),
  components: {
    Navigation
  }
}
</script>

<style lang="scss" scoped>
  #dashboard {
    width: 100%;
    height: 100%;
  }
</style>
