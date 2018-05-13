<template>
  <div class="container">
    <h2>Comments</h2>

    <NewComment />

    <div class="comments" v-if="comments.length > 0">
      <Comment v-for="comment in comments" :key="comment.id" :comment="comment" />
    </div>
    <div class="nothing-found" v-else>
      <h3><i class="fas fa-exclamation-triangle"></i> There are no comments, be first to post ! :)</h3>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import NewComment from './NewComment'
import Comment from './Comment'

export default {
  name: 'Comments',
  props: [ 'task' ],
  components: { NewComment, Comment },
  created () {
    this.getComments(this.task.id)
  },
  computed: {
    ...mapGetters(['user', 'comments'])
  },
  methods: {
    ...mapActions(['getComments'])
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    max-width: 1024px;
    margin: 30px auto;

    h2 {
      font-size: 30px;
      font-weight: 400;
    }

    .comments {
      margin-top: 50px;
      border-radius: 5px;
      background-color: #fff;
    }
  }
</style>
