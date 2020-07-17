<template>
  <div class="home">
    <el-form ref="form" :model="form" label-width="80px">
      <div class="form__input">
        <input type="text" placeholder="+ 新增一個待辦事項" required v-if="!todoShow" @click="todoShow=true">
        <input type="text" placeholder="請在此輸入標題" v-model="form.title" v-if="todoShow">
      </div>
      <div class="form__content" v-if="todoShow">
        <el-form-item label="到期日">
          <el-date-picker type="datetime" placeholder="選擇日期時間" v-model="form.deadline"></el-date-picker>
        </el-form-item>
        <el-form-item label="詳細內容">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
      </div>
      <div class="form__action" v-if="todoShow">
        <el-button-group>
					<el-button @click="todoShow=false">X 取消</el-button>
					<el-button type="primary" @click="onAddList">+ 新增任務</el-button>
				</el-button-group>
      </div>
    </el-form>
    <lists :lists="lists"></lists>
  </div>
</template>

<script>
import {db} from '../db'
import lists from './components/lists'

export default {
  name: 'Home',
  components: { lists },
  data() {
    return {
      todoShow: false,
      form: {
        title: null,
        deadline: null,
        content: null
      },
      lists: []
    }
  },
  firestore: {
    lists: db.collection('lists').orderBy('create_time','desc')
  },
  methods: {
    onAddList: function() {
      db.collection('lists').doc().set({
        title: this.form.title,
        deadline: this.form.deadline,
        content: this.form.content,
        create_time: new Date(),
        status_checked: false,
        status_star: false
      }).then(() => {
        this.$message('新增成功')
        this.resetForm()
      })
    },
    resetForm() {
      this.todoShow = false
      this.form = { }
    }
  }
}
</script>