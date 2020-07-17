<template>
  <ul class="lists">
    <li v-for="(item, index) in lists" :key="index" :class="{ 'status_star' : item.status_star }">
      <div class="lists__hr">
        <el-checkbox v-model="item.status_checked" @change="onCompleted(index)"><h2 class="lists__title">{{ item.title }}</h2></el-checkbox>
        <el-button type="warning" v-model="item.status_star" v-if="item.status_star" icon="el-icon-star-on" circle @click="onStarSwitch(index)"></el-button>
        <el-button type="warning" v-model="item.status_star" v-if="!item.status_star" icon="el-icon-star-off" circle @click="onStarSwitch(index)"></el-button>
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
      // icon: 'el-icon-star-off'
    }
  },
  mixins: [db, Filter],
  props: {
    lists: Array
  },
  methods: {
    onCompleted(index) {
      let id = this.lists[index].id
      db.collection('lists').doc(id).update({
        status_checked: this.lists[index].status_checked
      }).then(() => {
        if (this.lists[index].status_checked === true) {
          this.$message('任務完成')
        } else {
          this.$message('取消任務完成')
        }
      })
    },
    onStarSwitch(index) {
      let id = this.lists[index].id
      this.lists[index].status_star = !this.lists[index].status_star
      db.collection('lists').doc(id).update({
        status_star: this.lists[index].status_star
      }).then(() => {
        if (this.lists[index].status_star === true) {
          this.$message('標記成功')
        } else {
          this.$message('取消標記成功')
        }
      })
    }
  }
}
</script>