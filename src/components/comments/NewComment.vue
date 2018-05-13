<template>
  <div class="new-comment">
      <div class="form-group">
        <label>Post a comment</label>
        <textarea rows="3" v-model="body"></textarea>
        <span class="error" v-if="error !== ''">{{ error }}</span>
      </div>
      <button @click="post">Post</button>
      <div class="clear" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import bus from '@/services/bus'

export default {
  name: 'Tasks',
  data: () => ({
    body: '',
    error: ''
  }),
  computed: {
    ...mapGetters(['user', 'task'])
  },
  methods: {
    ...mapActions(['addComment']),
    post () {
      if (this.body !== '') {
        bus.$emit('loader', true)
        let params = {
          body: this.body,
          author: this.user.username,
          taskId: this.task.id
        }
        this.addComment(params)
          .then(() => {
            this.body = ''
            this.error = ''
            bus.$emit('message', {
              title: 'Success',
              message: 'Comment posted successfully'
            })
            bus.$emit('loader', false)
          })
      } else {
        this.error = 'Field comment is empty !'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .clear {
    clear: both;
  }
  .new-comment {

    .error {
      float: left;
      line-height: 40px;
    }

    label {
      display: block;
      margin: 20px 0 10px 0;
      font-size: 18px;
    }

    textarea {
      width: 100%;
      background-color: #fff;
      border-radius: 3px;
      padding: 15px;
      resize: none;
    }

    button {
      margin-top: 20px;
      float: right;
    }
  }
</style>
