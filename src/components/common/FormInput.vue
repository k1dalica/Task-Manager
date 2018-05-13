<template>
  <div class="form-group">
    <label :class="{ 'up': upperLabel }" @click="$refs.input.focus()">{{ label }}</label>
    <input ref="input" :type="type" v-model="text" @focus="inputFocused = true" @blur="inputFocused = false" v-on:keyup.enter="$emit('on-enter')">
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: ['type', 'label', 'value'],
  data: () => ({
    text: this.value,
    inputFocused: false
  }),
  computed: {
    upperLabel () {
      return (this.inputFocused || this.value.length > 0)
    }
  },
  watch: {
    text (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    valueUpdate () {
      // this.$emit('on-value-change', this.text)
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-group {
    position: relative;
    padding-top: 30px;
    margin-bottom: 5px;

    label {
      display: block;
      line-height: 35px;
      width: 100%;
      font-size: 15px;
      position: absolute;
      color: #999;
      left: 0;
      bottom: 0;
      z-index: 0;
      transition: all ease-out .2s;
      &.up {
        bottom: 35px;
        line-height: 30px;
      }
    }
    input {
      width: 400px;
      max-width: 100%;
      height: 35px;
      font-size: 18px;
      line-height: 35px;
      border-bottom: 1px solid rgba(0, 0, 0, .2);
      background-color: transparent;
      text-align: inherit;

      &:focus {
        border-color: $orange;
      }
    }
  }
</style>
