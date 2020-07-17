<template>
  <div class="home">
    <el-form ref="form" :model="form" label-width="80px">
      <div class="form__input">
        <input type="text" placeholder="+ 新增一個待辦事項" required v-if="!todoShow" @click="todoShow=true">
        <input type="text" placeholder="請在此輸入標題" v-model="form.title" v-if="todoShow">
      </div>
      <div class="form__content" v-if="todoShow">
        <el-form-item label="到期日">
          <el-date-picker type="datetime" placeholder="選擇日期時間" v-model="form.deadline" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="詳細內容">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
      </div>
      <div class="form__action" v-if="todoShow">
        <el-button-group>
					<el-button @click="todoShow=false">X 取消</el-button>
					<el-button type="primary">+ 新增任務</el-button>
				</el-button-group>
      </div>
    </el-form>
    <ul class="lists">
      <li v-for="(item, index) in lists" :key="index" :class="{ 'status_star' : item.status_star }">
        <div class="lists__hr">
          <el-checkbox :id="'todo-' + index" v-model="item.status_checked"><h2 class="lists__title">{{ item.title }}</h2></el-checkbox>
          <el-button type="warning" v-model="item.status_star" :icon="icon" circle @click="onStarSwitch(index)"></el-button>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
        </div>
        <p class="lists__content" v-html="$options.filters.break(item.content)"></p>
        <i class="el-icon-alarm-clock lists__time">{{ item.deadline | timeStamp | dateFormat('YYYY.MM.DD HH:mm') }}</i>
      </li>
    </ul>
  </div>
</template>

<script>
import {db} from '../db'
import Filter from '../filters'

export default {
  name: 'Home',
  mixins: [Filter],
  data() {
    return {
      todoShow: false,
      form: {
        title: null,
        deadline: null,
        content: null
      },
      lists: [],
      icon: 'el-icon-star-off'
    }
  },
  firestore: {
    lists: db.collection('lists'),
  },
  methods: {
    onStarSwitch(id) {
      this.lists[id].status_star = !this.lists[id].status_star
      if (this.lists[id].status_star) {
        this.icon = 'el-icon-star-on'
      } else {
        this.icon = 'el-icon-star-off'
      }
    }
  }
}
</script>