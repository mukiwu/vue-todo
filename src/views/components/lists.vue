<template>
  <ul class="lists">
    <li v-for="(item, index) in lists" :key="index" :class="{ 'status_star' : item.status_star }">
      <div class="lists__hr">
        <el-checkbox :id="'todo-' + index" v-model="item.status_checked"><h2 class="lists__title">{{ item.title }}</h2></el-checkbox>
        <el-button type="warning" v-model="item.status_star" :icon="icon" circle @click="onStarSwitch(index)"></el-button>
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </div>
      <p class="lists__content" v-html="$options.filters.break(item.content)"></p>
      <i class="el-icon-alarm-clock lists__time">{{ item.deadline | timeStamp | dateFormat('YYYY.MM.DD HH:mm') }}</i>
    </li>
  </ul>
</template>

<script>
import {db} from '../../db'
import Filter from '../../filters'

export default {
  data() {
    return {
      icon: 'el-icon-star-off'
    }
  },
  mixins: [db, Filter],
  props: {
    lists: Array
  },
  methods: {
    onStarSwitch(id) {
      this.lists[id].status_star = !this.lists[id].status_star
      let idStr = id.toString()
      db.collection('lists').doc(idStr).update({
        status_star: this.lists[id].status_star
      }).then(() => {
        this.$message('新增成功')
      })
      if (this.lists[id].status_star) {
        this.icon = 'el-icon-star-on'
      } else {
        this.icon = 'el-icon-star-off'
      }
      
    }
  }
}
</script>