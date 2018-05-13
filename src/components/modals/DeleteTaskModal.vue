<template>
  <div id="delete-task-modal" v-if="task !== null" @click="close">
    <div class="container" @click.stop>
      <h2>Confirmation</h2>
      <p>Are you sure you want to delete task:<br/><b>{{ task.title }}</b></p>
      <div>
        <button @click="close">Cancel</button>
        <button class="red" @click="confirmDeleteTask">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import bus from '@/services/bus'

export default {
  name: 'DeleteTaskModal',
  props: [ 'task' ],
  methods: {
    ...mapActions(['deleteTask', 'deleteTaskComments']),
    confirmDeleteTask () {
      // Trebao bih da brisem i komentare ali json server vec sam to radi.
      this.deleteTask(this.task.id)
        .then(() => {
          bus.$emit('loader', false)
          bus.$emit('message', {
            title: 'Success',
            message: 'Task successfully deleted'
          })
          this.$router.push({ name: 'Tasks' })
        })
    },
    close () {
      this.$emit('hide', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  #delete-task-modal {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 15;

    .container {
      max-width: 600px;
      padding: 30px 50px;
      background-color: #fff;
      color: #666;
      border-radius: 3px;
      text-align: center;

      h2 {
        text-align: center;
        font-size: 25px;
        color: #444;
        margin-bottom: 20px;
      }

      p, b {
        font-size: 19px;
        text-align: center;
        color: #777;
      }

      button {
        margin-top: 20px;
      }
    }
  }
</style>
