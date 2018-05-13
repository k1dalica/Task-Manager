<template>
  <div class="container">
    <Heading title="Edit task" />

    <div class="form" v-if="task !== null">
      <InputModel type="text" label="Task name" v-model="task.title" />
      <span class="error" v-if="titleError !== ''">{{ titleError }}</span>

      <InputModel type="textarea" label="Description" v-model="task.description" />
      <span class="error" v-if="descError !== ''">{{ descError }}</span>

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
import InputModel from '@/components/common/InputModel'
import Heading from '@/components/common/Heading'

export default {
  name: 'NewTask',
  components: { ChooseAssignee, InputModel, Heading },
  data: () => ({
    id: null,
    titleError: '',
    descError: '',
    assigneeError: '',
    assignee: null
  }),
  computed: {
    ...mapGetters(['user', 'users', 'task'])
  },
  created () {
    this.id = this.$route.params.id
    const a = this.getTask(this.id)
    const b = this.getUsers()

    Promise.all([a, b]).then(values => {
      const res = values[0]
      if (res.author !== this.user.username) {
        this.$router.push({ name: 'Tasks' })
      }
      this.findAssignee()
      bus.$emit('loader', false)
    })
  },
  methods: {
    ...mapActions(['getUsers', 'getTask', 'editTask']),
    findAssignee () {
      this.users.forEach(u => {
        if (u.username === this.task.assignee) {
          this.assignee = u
        }
      })
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
