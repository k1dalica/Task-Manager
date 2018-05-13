<template>
  <div id="app">
    <Loader v-show="loader" />

    <transition  name="fade">
      <Message v-if="notifyMessage" :data="notifyMessage" />
    </transition>

    <router-view />
  </div>
</template>

<script>
import bus from './services/bus'
import Loader from './components/common/Loader'
import Message from './components/modals/Message'

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
  .fade-enter-active, .fade-leave-active {
    transition: opacity ease-in-out .1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
