<template>
  <div class="container">
    <h1>All tasks</h1>
    <div class="content-box">
      <TasksTable :tasks="tasks"/>
    </div>
  </div>
</template>

<script>
import bus from '@/services/bus'
import { mapActions, mapGetters } from 'vuex'
import TasksTable from './../common/TasksTable'

export default {
  name: 'Tasks',
  mounted () {
    this.loadTasks()
  },
  watch: {
    user (val) {
      this.loadTasks()
    }
  },
  computed: {
    ...mapGetters(['user', 'tasks'])
  },
  methods: {
    ...mapActions(['getAllTasks']),
    loadTasks () {
      if (this.user && this.user.username !== null) {
        this.getAllTasks(this.user.username)
          .then(() => bus.$emit('loader', false))
          .catch(() => bus.$emit('loader', false))
      }
    }
  },
  components: {
    TasksTable
  }
}
</script>

<style lang="scss" scoped>
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
  .content-box {
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
  }
</style>
