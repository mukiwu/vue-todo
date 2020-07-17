<template>
  <ul class="lists">
    <li v-for="(item, index) in lists" :key="index" :class="{ 'status_star' : item.status_star }">
      <div class="lists__data" v-if="listShow">
        <div class="lists__hr">
          <el-checkbox v-model="item.status_checked" @change="onCompleted(index)"><h2 class="lists__title">{{ item.title }}</h2></el-checkbox>
          <el-button type="warning" v-model="item.status_star" v-if="item.status_star" icon="el-icon-star-on" circle @click="onStarSwitch(index)"></el-button>
          <el-button type="warning" v-model="item.status_star" v-if="!item.status_star" icon="el-icon-star-off" circle @click="onStarSwitch(index)"></el-button>
          <el-button type="primary" icon="el-icon-edit" circle @click="onEditBtn(index)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="onDelete(index)"></el-button>
        </div>
        <p class="lists__content" v-html="$options.filters.break(item.content)"></p>
        <i class="el-icon-alarm-clock lists__time">{{ item.deadline | timeStamp | dateFormat('YYYY.MM.DD HH:mm') }}</i>
      </div>
      <div class="lists__edit" v-if="!listShow">
        <el-form ref="editForm" label-width="80px">
          <el-form-item label="標題">
            <el-input type="text" placeholder="請在此輸入標題" v-model="item.title"></el-input>
          </el-form-item>
          <el-form-item label="到期日">
            <el-date-picker type="datetime" placeholder="選擇日期時間" v-model="deadlineConvert"></el-date-picker>
          </el-form-item>
          <el-form-item label="詳細內容">
            <el-input type="textarea" v-model="item.content"></el-input>
          </el-form-item>
        </el-form>
        <div style="text-align: center;">
          <el-button-group>
            <el-button @click="listShow=true">取消</el-button>
            <el-button type="primary" @click="onEdit(index)">修改</el-button>
          </el-button-group>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import {db} from '../../db'
import Filter from '../../filters'

export default {
  data() {
    return {
      listShow: true,
      deadlineConvert : null,
    }
  },
  mixins: [db, Filter],
  props: {
    lists: Array
  },
  methods: {
    deadline(time) {
      return this.deadlineConvert = new Date(time.seconds * 1000)
    },
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
    },
    onDelete(index) {
      let id = this.lists[index].id
      this.$confirm('此操作會永久刪除該筆待辦清單，是否繼續？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        db.collection('lists').doc(id).delete().then(() => {
          this.$message({
            type: 'success',
            message: '刪除成功'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消刪除'
        })
      })
    },
    onEditBtn(index) {
      this.listShow = false
      let time = this.lists[index].deadline
      this.deadline(time)
    },
    onEdit(index) {
      let id = this.lists[index].id
      db.collection('lists').doc(id).update({
        title: this.lists[index].title,
        deadline: this.deadlineConvert,
        content: this.lists[index].content,
        modify_time: new Date()
      }).then(() => {
        this.$message('修改成功')
        this.listShow = true
      })
    }
  }
}
</script>