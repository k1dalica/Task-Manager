<template>
  <div id="loader">
    <img src="@/assets/images/logo-dark.png" alt="">
  </div>
</template>

<script>
export default {
  name: '',
  data: () => ({

  })
}
</script>

<style lang="scss" scoped>
  #loader {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(255, 255, 255, .8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 15;
    img {
      animation-name: blink;
      animation-duration: 3s;
      animation-iteration-count: infinite;
    }
  }

  @keyframes blink {
    0% { opacity: 1; }
    50% { opacity: 0.3; }
    100% { opacity: 1; }
}

</style>
