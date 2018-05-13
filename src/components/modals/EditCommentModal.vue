<template>
  <div id="edit-comment-modal" v-if="comment !== null" @click="close">
    <div class="container" @click.stop>
      <h2>Edit comment</h2>
      <textarea rows="4" v-model="text"></textarea>
      <span class="error" v-if="error !== ''">{{ error }}</span>
      <div>
        <button @click="close">Cancel</button>
        <button class="red" @click="confirmEditComment">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import bus from '@/services/bus'

export default {
  name: 'EditCommentModal',
  props: [ 'comment' ],
  data: () => ({
    text: null,
    error: ''
  }),
  created () {
    this.text = this.comment.body
  },
  methods: {
    ...mapActions(['editComment']),
    confirmEditComment () {
      if (this.text !== '') {
        let params = {
          id: this.comment.id,
          body: this.text,
          author: this.comment.author,
          taskId: this.comment.taskId
        }
        this.editComment(params)
          .then(() => {
            bus.$emit('loader', false)
            this.close()
            bus.$emit('message', {
              title: 'Success',
              message: 'Comment successfully edited'
            })
          })
      } else {
        this.error = 'Field comment is empty'
      }
    },
    close () {
      this.$emit('hide', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  #edit-comment-modal {
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

      textarea {
        width: 500px;
        max-width: 100%;
        background-color: rgba(0, 0, 0, .1);
        padding: 20px;
        border-radius: 3px;
      }

      button {
        margin-top: 20px;
      }
    }
  }
</style>
