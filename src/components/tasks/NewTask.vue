<template>
  <div class="container">
    <h1>Add new task</h1>
    <div class="form">
      <div class="form-group">
        <label>Task name</label>
        <input type="text" class="input" v-model="title">
        <span class="error" v-if="titleError !== ''">{{ titleError }}</span>
      </div>

      <div class="form-group">
        <label>Description</label>
        <textarea rows="5" v-model="description"></textarea>
        <span class="error" v-if="descError !== ''">{{ descError }}</span>
      </div>

      <div class="bottom">
        <div class="float-left">
          <ChooseAssignee v-if="users.length > 0" :assignee="assignee" :users="users" :user="user" @change-assignee="setAssignee" />
          <span class="error" v-if="assigneeError !== ''">{{ assigneeError }}</span>
        </div>

        <button class="float-right" @click="create">Create task</button>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/services/bus'
import { mapActions, mapGetters } from 'vuex'
import ChooseAssignee from '@/components/common/ChooseAssignee'

export default {
  name: 'NewTask',
  data: () => ({
    title: '',
    description: '',
    assignee: null,
    titleError: '',
    descError: '',
    assigneeError: ''
  }),
  created () {
    this.getUsers()
      .then(() => bus.$emit('loader', false))
      .catch(() => bus.$emit('loader', false))
  },
  computed: {
    ...mapGetters(['user', 'users'])
  },
  methods: {
    ...mapActions(['getUsers', 'createTask']),
    create () {
      if (this.title !== '' && this.description !== '' && this.assignee) {
        bus.$emit('loader', true)
        let params = {
          title: this.title,
          description: this.description,
          author: this.user.username,
          assignee: this.assignee.username
        }
        this.createTask(params)
          .then(res => {
            this.$router.push({ name: 'Task', params: { id: res.id } })
            bus.$emit('loader', false)
          })
          .catch(() => bus.$emit('loader', false))
      } else {
        if (this.title === '') {
          this.titleError = 'Field Task name is empty !'
        }
        if (this.description === '') {
          this.descError = 'Field Description is empty !'
        }
        if (!this.assignee) {
          this.assigneeError = 'Assignee isn\'t selected !'
        }
      }
    },
    setAssignee (val) {
      this.assignee = val
    }
  },
  components: {
    ChooseAssignee
  }
}
</script>

<style lang="scss" scoped>
  .form {

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

    .bottom {
      margin-top: 20px;
    }
  }
  .container {
    width: 100%;
    max-width: 1024px;
    margin: 50px auto;

    h1 {
      font-size: 40px;
      font-weight: 300;
      color: #000;
      margin-bottom: 20px;
    }
  }

  .float-right {
    float: right;
  }
  .float-left {
    float: left;
  }
</style>
