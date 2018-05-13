<template>
  <h1>{{ title }}</h1>
</template>

<script>
export default {
  name: 'Heading',
  props: ['title']
}
</script>

<style lang="scss" scoped>
  h1 {
    font-size: 40px;
    font-weight: 300;
    color: #000;
    margin-bottom: 20px;
  }
</style>
