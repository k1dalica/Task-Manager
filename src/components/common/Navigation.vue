<template>
  <header>
    <nav>
      <div class="logo">
        <img src="@/assets/images/logo.png">
      </div>
      <ul>
        <li><router-link :to="{ name: 'Tasks'}">My tasks</router-link></li>
        <li><router-link :to="{ name: 'AssignedToMe'}">Assigned to me</router-link></li>
        <li><router-link :to="{ name: 'NewTask'}"><i class="fas fa-plus"></i> New task</router-link></li>
      </ul>

      <div class="float-right">
        <div class="user-info" v-if="user">
          <span>{{ user.username }}</span>
          <img :src="avatar" class="avatar">
        </div>
        <button class="logout" @click="logout">Logout</button>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import unknown from '@/assets/images/unknown.jpg'

export default {
  name: 'Navigation',
  data: () => ({

  }),
  computed: {
    ...mapGetters(['user']),
    avatar () {
      return (!this.user.avatar || this.user.avatar === '') ? unknown : this.user.avatar
    }
  },
  methods: {
    ...mapActions(['logoutUser']),
    logout () {
      this.logoutUser()
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="scss" scoped>
  $height: 100px;

  .float-right {
    float: right;
  }

  header {
    width: 100%;
    height: $height;
    line-height: $height;
    background-color: $dark;

    nav {
      padding: 0 50px;
      color: #fff;

      .user-info {
        display: inline-block;
        margin-right: 30px;
        span {
          margin-right: 10px;
        }
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          vertical-align: middle;
          object-fit: cover;
        }
      }

      .logout {
        height: 40px;
        border: 1px solid #fff;
        border-radius: 3px;
        padding: 0 20px;
        margin-top: 30px;
        background-color: transparent;
        &:hover, &:focus {
          background-color: #fff;
          color: $dark;
          cursor: pointer;
          transition: all ease-out .2s;
        }
      }

      .logo {
        display: inline-block;
        padding: 15px 0;
        margin: 0;
        height: auto;
        img {
          height: 60px;
        }
      }

      ul {
        display: inline-block;
        margin-left: 30px;
        font-size: 0;

        li {
          display: inline-block;

          a {
            padding: 15px 15px;
            transition: all ease-out .2s;
            border-bottom: 1px solid transparent;

            &:hover, &:focus {
              border-color: #999;
              cursor: pointer;
            }

            &.router-link-exact-active {
              border-color: $orange;
            }

            i {
              line-height: $height;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
</style>
