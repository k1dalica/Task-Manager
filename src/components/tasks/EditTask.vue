<template>
  <div class="container">
    <h1>Edit task</h1>
    <div class="form" v-if="task !== null">
      <div class="form-group">
        <label>Task name</label>
        <input type="text" class="input" v-model="task.title">
        <span class="error" v-if="titleError !== ''">{{ titleError }}</span>
      </div>

      <div class="form-group">
        <label>Description</label>
        <textarea rows="5" v-model="task.description"></textarea>
        <span class="error" v-if="descError !== ''">{{ descError }}</span>
      </div>

      <div class="bottom">
        <div class="float-left">
          <ChooseAssignee v-if="users.length > 0" :assignee="assignee" :users="users" :user="user" @change-assignee="setAssignee" />
          <span class="error" v-if="assigneeError !== ''">{{ assigneeError }}</span>
        </div>

        <button class="float-right" @click="edit">Edit task</button>
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
    id: null,
    titleError: '',
    descError: '',
    assigneeError: '',
    assignee: null
  }),
  created () {
    this.id = this.$route.params.id

    this.getTask(this.id)
      .then(() => {
        this.findAssignee()
        bus.$emit('loader', false)
      })
      .catch(() => bus.$emit('loader', false))
    this.getUsers()
      .then(() => {
        this.findAssignee()
        bus.$emit('loader', false)
      })
      .catch(() => bus.$emit('loader', false))
  },
  computed: {
    ...mapGetters(['user', 'users', 'task'])
  },
  methods: {
    ...mapActions(['getUsers', 'getTask', 'editTask']),
    findAssignee () {
      if (this.users.length > 0 && this.task !== null) {
        this.users.forEach(u => {
          if (u.username === this.task.assignee) {
            this.assignee = u
          }
        })
      }
    },
    edit () {
      if (this.task.title !== '' && this.task.description !== '' && this.assignee) {
        bus.$emit('loader', true)
        let params = {
          id: this.id,
          title: this.task.title,
          description: this.task.description,
          assignee: this.assignee.username,
          author: this.task.author
        }
        this.editTask(params)
          .then(() => {
            bus.$emit('message', {
              title: 'Success',
              message: 'Task successfully edited'
            })
            bus.$emit('loader', false)
          })
          .catch(() => bus.$emit('loader', false))
      } else {
        if (this.task.title === '') {
          this.titleError = 'Field Task name is empty !'
        }
        if (this.task.description === '') {
          this.descError = 'Field Description is empty !'
        }
        if (!this.task.assignee) {
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
