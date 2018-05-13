<template>
  <div class="nothing-found">
    <h3><i class="fas fa-exclamation-triangle"></i> {{ text }}</h3>
  </div>
</template>

<script>
export default {
  name: 'NoResult',
  props: ['text']
}
</script>

<style lang="scss" scoped>
  .nothing-found {
    h3 {
      font-size: 25px;
      font-weight: 300;
      line-height: 30px;

      i {
        line-height: 30px;
        font-size: 30px;
        margin-right: 10px;
        color: $orange;
      }
    }
  }
</style>
