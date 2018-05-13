<template>
  <div id="delete-comment-modal" v-if="comment !== null" @click="close">
    <div class="container" @click.stop>
      <h2>Confirmation</h2>
      <p>Are you sure you want to delete comment created by:<br/><b>{{ comment.author }}</b></p>
      <div>
        <button @click="close">Cancel</button>
        <button class="red" @click="confirmDeleteComment">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import bus from '@/services/bus'

export default {
  name: 'DeleteCommentModal',
  props: [ 'comment' ],
  methods: {
    ...mapActions(['deleteComment']),
    confirmDeleteComment () {
      this.deleteComment(this.comment.id)
        .then(() => {
          bus.$emit('loader', false)
          this.close()
          bus.$emit('message', {
            title: 'Success',
            message: 'Comment deleted successfully'
          })
        })
    },
    close () {
      this.$emit('hide', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  #delete-comment-modal {
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
