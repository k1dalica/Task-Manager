<template>
  <div class="assignee">
    <div v-if="assignee !== null" class="selected-assignee">
      <img :src="userAvatar(assignee.avatar)">
      <span>{{ assignee.username }}</span>
      <i class="fas fa-times" @click="setAssignee(null)"></i>
    </div>

    <input v-else type="text" v-model="search" placeholder="Assignee"  @focus="focused = true" @blur="setFocusOff" class="search">

    <button @click="setAssignee(user)">Assign to me</button>

    <ul v-if="users.length > 0 && assignee === null && focused">
      <li v-for="u in filteredUsers" :key="u.id" @click="setAssignee(u)">
        <img :src="userAvatar(u.avatar)">
        <span>{{ u.username }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import unknown from '@/assets/images/unknown.jpg'

export default {
  name: 'ChooseAssignee',
  props: ['assignee', 'users', 'user'],
  data: () => ({
    search: '',
    focused: false
  }),
  computed: {
    filteredUsers () {
      let list
      if (this.search !== '') {
        list = this.users.filter(u => {
          u.username = u.username.toLowerCase()
          return u.username.indexOf(this.search) > -1
        })
      } else {
        list = this.users
      }
      return (list.length > 5) ? list.slice(0, 5) : list
    }
  },
  methods: {
    setFocusOff () {
      setTimeout(() => {
        this.focused = false
      }, 150)
    },
    setAssignee (val) {
      this.search = ''
      this.$emit('change-assignee', val)
    },
    userAvatar (avatar) {
      return (!avatar || avatar === '') ? unknown : avatar
    }
  }
}
</script>

<style lang="scss" scoped>
  .assignee {
    position: relative;

    .search {
      width: 220px;
      padding: 0 20px;
      border-radius: 3px;
      height: 40px;
      margin-right: 10px;
    }

    .selected-assignee {
      display: inline-block;
      margin-right: 10px;
      height: 40px;
      line-height: 30px;
      padding: 5px;
      width: 220px;
      background-color: #fff;
      border-radius: 3px;

      img {
        width: 30px;
        height: 30px;
        object-fit: cover;
        border-radius: 3px;
        margin-right: 5px;
      }

      i {
        float: right;
        line-height: 30px;
        padding: 0 5px;
        cursor: pointer;
        &:hover {
          color: $red;
        }
      }
    }

    ul {
      width: 220px;
      background-color: #fff;
      border-radius: 3px;
      position: relative;
      top: 5px;
      left: 0;
      overflow: hidden;

      li {
        height: 40px;
        line-height: 30px;
        padding: 5px;
        border-bottom: 1px solid rgba(0, 0, 0, .1);
        transition: all ease-out .2s;

        img {
          width: 30px;
          height: 30px;
          object-fit: cover;
          border-radius: 3px;
          margin-right: 5px;
        }

        &:hover {
          background-color: $orange;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
</style>
