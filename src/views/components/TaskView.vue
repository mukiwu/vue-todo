<template>
  <div>
    <div class="lists__data" v-if="listShow">
      <div class="lists__hr">
        <el-checkbox v-model="task.status_checked" @change="onCompleted()"><h2 class="lists__title">{{ task.title }}</h2></el-checkbox>
        <el-button type="warning" v-model="task.status_star" v-if="task.status_star" icon="el-icon-star-on" circle @click="onStarSwitch()"></el-button>
        <el-button type="warning" v-model="task.status_star" v-if="!task.status_star" icon="el-icon-star-off" circle @click="onStarSwitch()"></el-button>
        <el-button type="primary" icon="el-icon-edit" circle @click="onEditBtn()"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="onDelete()"></el-button>
      </div>
      <p class="lists__content" v-html="$options.filters.break(task.content)"></p>
      <i class="el-icon-alarm-clock lists__time">{{ task.deadline | timeStamp | dateFormat('YYYY.MM.DD HH:mm') }}</i>
    </div>
    <div class="lists__edit" v-if="!listShow">
      <el-form ref="editForm" label-width="80px">
        <el-form-item label="標題">
          <el-input type="text" placeholder="請在此輸入標題" v-model="task.title"></el-input>
        </el-form-item>
        <el-form-item label="到期日">
          <el-date-picker type="datetime" placeholder="選擇日期時間" v-model="deadlineConvert"></el-date-picker>
        </el-form-item>
        <el-form-item label="詳細內容">
          <el-input type="textarea" v-model="task.content"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center;">
        <el-button-group>
          <el-button @click="listShow=true">取消</el-button>
          <el-button type="primary" @click="onEdit()">修改</el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<script>
import {db} from '../../db'
import Filter from '../../filters'

export default {
  name: 'TaskView',
  data() {
    return {
      listShow: true,
      deadlineConvert : null,
      taskID: this.task.id
    }
  },
  mixins: [db, Filter],
  props: {
    task: Object
  },
  methods: {
    deadline(time) {
      return this.deadlineConvert = new Date(time.seconds * 1000)
    },
    onCompleted() {
      db.collection('lists').doc(this.taskID).update({
        status_checked: this.task.status_checked
      }).then(() => {
        if (this.task.status_checked === true) {
          this.$message('任務完成')
        } else {
          this.$message('取消任務完成')
        }
      })
    },
    onStarSwitch() {
      this.task.status_star = !this.task.status_star
      db.collection('lists').doc(this.taskID).update({
        status_star: this.task.status_star
      }).then(() => {
        if (this.task.status_star === true) {
          this.$message('標記成功')
        } else {
          this.$message('取消標記成功')
        }
      })
    },
    onDelete() {
      this.$confirm('此操作會永久刪除該筆待辦清單，是否繼續？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        db.collection('lists').doc(this.taskID).delete().then(() => {
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
    onEditBtn() {
      this.listShow = false
      let time = this.task.deadline
      this.deadline(time)
    },
    onEdit() {
      db.collection('lists').doc(this.taskID).update({
        title: this.task.title,
        deadline: this.deadlineConvert,
        content: this.task.content,
        modify_time: new Date()
      }).then(() => {
        this.$message('修改成功')
        this.listShow = true
      })
    }
  }
}
</script>