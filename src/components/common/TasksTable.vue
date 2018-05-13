<template>
  <div>
    <table v-if="tasks.length > 0">
      <tr class="header">
        <th>Task name</th>
        <th>Created by</th>
        <th>Assignee</th>
      </tr>
      <tbody v-if="tasks.length > 0">
        <tr v-for="task in tasks" :key="task.id" @click="openTask(task.id)">
          <td>{{ task.title }}</td>
          <td>{{ task.author }}</td>
          <td>{{ task.assignee }}</td>
        </tr>
      </tbody>
    </table>
    <div class="nothing-found" v-else>
      <h3><i class="fas fa-exclamation-triangle"></i> No tasks were found</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TasksTable',
  props: ['tasks'],
  methods: {
    openTask (id) {
      this.$router.push({ name: 'Task', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
table {
    width: 100%;
    border-collapse: collapse;

    tr {
      border-bottom: 1px solid rgba(0, 0, 0, .1);

      &.header {
        border-bottom: 1px solid rgba(0, 0, 0, .2);
      }

      th {
        padding: 15px 20px;
        font-weight: bold;
        text-align: right;

        &:first-child {
          text-align: left;
        }
      }

      td {
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        text-align: right;
        color: #777;

        &:first-child {
          text-align: left;
        }
      }
    }

    tbody tr:hover {
      background-color: #f5f5f5;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      border-top: 1px solid rgba(0, 0, 0, .1);
      cursor: pointer;
    }
  }
</style>
