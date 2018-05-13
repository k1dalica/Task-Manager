<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input v-if="type === 'text'" v-model="text" v-on:keyup.enter="$emit('on-enter')" class="input">
    <textarea v-if="type === 'textarea'" rows="5" v-model="text" v-on:keyup.enter="$emit('on-enter')"></textarea>
  </div>
</template>

<script>
export default {
  name: 'InputModel',
  props: ['type', 'label', 'value'],
  data: () => ({
    text: ''
  }),
  created () {
    this.text = this.value
  },
  watch: {
    text (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-group {
    position: relative;
    margin-bottom: 5px;

    label {
      display: block;
      margin: 20px 0 10px 0;
    }

    .input, textarea {
      width: 100%;
      background-color: #fff;
      border-radius: 3px;
      padding: 0 15px;
    }

    .input {
      height: 40px;
    }

    textarea {
      padding: 15px;
      resize: none;
    }
  }
</style>
