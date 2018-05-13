<template>
  <div class="wrapper">
    <div class="container">
      <img class="logo" src="@/assets/images/logo-dark.png">
      <span class="error" v-if="error !== ''">{{ error }}</span>

      <FormInput type="text" label="Username" v-model="username" @on-enter="login" />
      <span class="error" v-if="usernameError !== ''">{{ usernameError }}</span>

      <FormInput type="password" label="Password" v-model="password" @on-enter="login" />
      <span class="error" v-if="passwordError !== ''">{{ passwordError }}</span>

      <button @click="login">Login</button>
    </div>
  </div>
</template>

<script>
import FormInput from './../common/FormInput'
import { mapActions } from 'vuex'
import loggedIn from '@/services/auth'
import bus from '@/services/bus'

export default {
  name: 'Login',
  data: () => ({
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
    error: ''
  }),
  mounted () {
    if (loggedIn()) {
      this.$router.push({ name: 'Tasks' })
    }
    bus.$emit('loader', false)
  },
  methods: {
    ...mapActions(['loginUser']),
    login () {
      this.error = ''
      if (this.username.length > 0 && this.password.length > 0) {
        let data = new URLSearchParams()
        data.append('username', this.username)
        data.append('password', this.password)

        this.loginUser(data)
          .then(res => {
            this.$router.push({ name: 'Tasks' })
          })
          .catch(() => { this.error = 'Wrong username/password combination !' })
      } else {
        this.usernameError = (this.username.length === 0) ? 'Field username is empty !' : ''
        this.passwordError = (this.password.length === 0) ? 'Field password is empty !' : ''
      }
    }
  },
  watch: {
    username (val) {
      if (val.length > 0 && this.usernameError !== '') {
        this.usernameError = ''
      }
    },
    password (val) {
      if (val.length > 0 && this.passwordError !== '') {
        this.passwordError = ''
      }
    }
  },
  components: {
    FormInput
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    max-width: 400px;
    padding: 50px;
    background-color: #fff;
    border-radius: 3px;
    text-align: center;

    .logo {
      margin: 0 auto;
      margin-bottom: 20px;
      display: block;
    }

    button {
      margin: 20px auto 0 auto;
    }
  }
</style>
