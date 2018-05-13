<template>
  <div class="container">
    <Heading title="Tasks assigned to me" />

    <TasksTable :tasks="tasks"/>
  </div>
</template>

<script>
import bus from '@/services/bus'
import { mapActions, mapGetters } from 'vuex'
import TasksTable from '@/components/common/TasksTable'
import Heading from '@/components/common/Heading'

export default {
  name: 'Tasks',
  components: { TasksTable, Heading },
  mounted () {
    this.loadTasks()
  },
  computed: {
    ...mapGetters(['user', 'tasks'])
  },
  watch: {
    user (val) {
      this.loadTasks()
    }
  },
  methods: {
    ...mapActions(['getTasks']),
    loadTasks () {
      if (this.user && this.user.username !== null) {
        this.getTasks({ username: this.user.username, param: 'assignee' })
          .then(() => bus.$emit('loader', false))
      }
    }
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
</style>
