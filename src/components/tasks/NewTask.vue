<template>
  <div class="container">
    <Heading title="New task" />

    <div class="form">
      <InputModel type="text" label="Task name" v-model="title" />
      <span class="error" v-if="titleError !== ''">{{ titleError }}</span>

      <InputModel type="textarea" label="Description" v-model="description" />
      <span class="error" v-if="descError !== ''">{{ descError }}</span>

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
import InputModel from '@/components/common/InputModel'
import Heading from '@/components/common/Heading'

export default {
  name: 'NewTask',
  components: { ChooseAssignee, InputModel, Heading },
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
  }
}
</script>

<style lang="scss" scoped>
  .form {

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
