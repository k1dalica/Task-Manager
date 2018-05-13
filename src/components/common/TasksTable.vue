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

    <NoResult v-else text="No tasks were found" />
  </div>
</template>

<script>
import NoResult from '@/components/common/NoResult'

export default {
  name: 'TasksTable',
  props: ['tasks'],
  components: { NoResult },
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
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;

    tr {
      border-bottom: 1px solid rgba(0, 0, 0, .1);

      &.header {
        border-bottom: 1px solid rgba(0, 0, 0, .2);
      }

      th {
        padding: 20px;
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
