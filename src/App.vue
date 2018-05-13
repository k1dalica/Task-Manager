<template>
  <div id="app">
    <Loader v-show="loader" />
    <Message v-show="notifyMessage" :data="notifyMessage" />

    <router-view />
  </div>
</template>

<script>
import bus from './services/bus'
import Loader from './components/common/Loader'
import Message from './components/common/Message'

export default {
  name: 'App',
  data: () => ({
    loader: false,
    notifyMessage: null
  }),
  created () {
    bus.$on('loader', this.toggleLoader)
    bus.$on('message', this.toggleMessage)
  },
  methods: {
    toggleMessage (msg) {
      this.notifyMessage = msg
    },
    toggleLoader (bool) {
      this.loader = bool
    }
  },
  components: {
    Loader,
    Message
  },
  destroyed () {
    bus.$off('loader')
  }
}
</script>

<style lang="scss">
  #app {
    width: 100%;
    height: 100%;
  }
</style>
