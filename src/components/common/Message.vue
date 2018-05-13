<template>
  <div id="message-popoup" v-if="data !== null" @click="close">
    <div class="container" @click.stop>
      <h2>{{ data.title }}</h2>
      <p v-html="data.message"></p>
      <div>
        <button @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/services/bus'

export default {
  name: '',
  props: [ 'data' ],
  methods: {
    close () {
      bus.$emit('message', null)
    }
  }
}
</script>

<style lang="scss" scoped>
  #message-popoup {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 15;

    .container {
      max-width: 600px;
      padding: 30px 50px;
      background-color: #fff;
      color: #666;
      border-radius: 3px;
      text-align: center;

      h2 {
        text-align: center;
        font-size: 25px;
        color: #444;
        margin-bottom: 20px;
      }

      p, b {
        font-size: 19px;
        text-align: center;
        color: #777;
      }

      button {
        margin-top: 20px;
      }
    }
  }
</style>
