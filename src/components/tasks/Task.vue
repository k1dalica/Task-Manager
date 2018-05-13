<template>
  <div class="container" v-if="task !== null">
    <DeleteTaskModal v-if="openDeleteTaskModal" :task="task" @hide="toggleDeleteModal"/>

    <div class="context-box">
      <h1>{{ task.title }}</h1>
      <span><i class="fas fa-user"></i> <b>{{ task.author }}</b> created this task and assigned it to <i class="fas fa-user"></i> <b>{{ task.assignee }}</b></span>
      <p>{{ task.description }}</p>

      <div class="buttons" v-if="permissions">
        <router-link :to="{ name: 'EditTask', params: { id: task.id }}"><button><i class="fas fa-pencil-alt"></i> Edit task</button></router-link>
        <button class="red" @click="toggleDeleteModal(true)"><i class="fas fa-trash-alt"></i> Delete task</button>
      </div>
    </div>

    <Comments v-if="loaded" :task="task" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import bus from '@/services/bus'
import DeleteTaskModal from '@/components/modals/DeleteTaskModal'
import Comments from '@/components/comments/Comments'

export default {
  name: 'Tasks',
  components: { DeleteTaskModal, Comments },
  data: () => ({
    id: null,
    loaded: false,
    openDeleteTaskModal: false,
    permissions: false
  }),
  created () {
    this.id = this.$route.params.id

    this.getTask(this.id)
      .then(res => {
        // Permissions for task
        this.permissions = (res.author === this.user.username)
        if (!this.permissions && res.assignee !== this.user.username) {
          this.$router.push({ name: 'Tasks' })
        }
        this.loaded = true
        bus.$emit('loader', false)
      })

    bus.$on('deletetaskconfirmed', this.confirmDeleteTask)
  },
  computed: {
    ...mapGetters(['user', 'task'])
  },
  methods: {
    ...mapActions(['getTask', 'deleteTask']),
    toggleDeleteModal (bool) {
      this.openDeleteTaskModal = bool
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    max-width: 1024px;
    margin: 70px auto;

    .context-box {
      background-color: #fff;
      padding: 15px;
      border-radius: 5px;

      span {
        display: block;
        margin-bottom: 10px;
        color: #888;
      }

      h1 {
        font-size: 30px;
        font-weight: 300;
        color: #000;
        margin-bottom: 10px;
        font-weight: bold;
      }

      p {
        font-size: 19px;
        color: #444;
      }

      .buttons {
        margin-top: 20px;
        button {
          height: 35px;
          line-height: 35px;
          padding: 0 20px;
          margin-right: 5px;
          i {
            line-height: 35px;
          }
        }
      }
    }
  }
</style>
