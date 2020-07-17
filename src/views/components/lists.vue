<template>
  <ul class="lists">
    <li v-for="(item, index) in lists" :key="index" :class="{ 'status_star' : item.status_star }">
      <TaskView :task="item" />
    </li>
  </ul>
</template>

<script>
import TaskView from '../components/TaskView'

export default {
  components: { TaskView },
  props: {
    lists: Array
  },
  mounted() {
    console.log(this.lists)
  }
}
</script>