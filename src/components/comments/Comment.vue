<template>
  <div class="comment" v-if="author">
    <EditCommentModal v-if="editMode" :comment="comment" @hide="editMode = false" />
    <DeleteCommentModal v-if="deleteComment" :comment="comment" @hide="deleteComment = false" />
    <img class="avatar" :src="avatar">
    <div class="text">
      <div class="buttons" v-if="permission">
        <i class="fas fa-pencil-alt" @click="editMode = true"></i>
        <i class="fas fa-trash-alt" @click="deleteComment = true"></i>
      </div>
      <h3>{{ author.username }}</h3>
      <p>{{ comment.body }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import unknown from '@/assets/images/unknown.jpg'
import DeleteCommentModal from '@/components/modals/DeleteCommentModal'
import EditCommentModal from '@/components/modals/EditCommentModal'

export default {
  name: 'Comment',
  props: ['comment'],
  components: { DeleteCommentModal, EditCommentModal },
  data: () => ({
    editMode: false,
    deleteComment: false,
    author: null,
    permission: null
  }),
  created () {
    this.getUserByName(this.comment.author)
      .then(res => {
        this.author = res
      })
    this.permission = ((this.user.author === this.user.username) || (this.task.author === this.user.username))
  },
  computed: {
    ...mapGetters(['user', 'task']),
    avatar () {
      return (!this.author.avatar || this.author.avatar === '') ? unknown : this.author.avatar
    }
  },
  methods: {
    ...mapActions(['getUserByName']),
    toggleDeleteModal (bool) {
      this.openDeleteTaskModal = bool
    }
  }
}
</script>

<style lang="scss" scoped>
  .comment {
    width: 100%;
    padding: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);

    .text {
      display: inline-block;
      vertical-align: top;
      width: calc(100% - 80px);

      h3 {
        font-size: 19px;
      }

      .buttons {
        float: right;

        i {
          padding: 6px 8px;
          border-radius: 3px;

          &:hover {
            background-color: rgba(0, 0, 0, .1);
            cursor: pointer;
          }
        }
      }
    }

    .avatar {
      display: inline-block;
      vertical-align: top;
      width: 60px;
      margin-right: 15px;

      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 3px;
      }
    }
  }
</style>
