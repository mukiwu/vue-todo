<template>
  <div class="home">
    <el-form ref="form" :model="form" label-width="80px">
      <div class="main__input">
        <input type="text" placeholder="+ 新增一個待辦事項" required v-if="!todoShow" @click="todoShow=true">
        <input type="text" placeholder="請在此輸入標題" v-model="form.title" v-if="todoShow">
      </div>
      <div class="main__content" v-if="todoShow">
        <el-form-item label="到期日">
          <el-date-picker type="datetime" placeholder="選擇日期時間" v-model="form.deadline" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="詳細內容">
          <el-input type="textarea" v-model="form.content"></el-input>
        </el-form-item>
      </div>
      <div class="main__action" v-if="todoShow">
        <el-button-group>
					<el-button @click="todoShow=false">X 取消</el-button>
					<el-button type="primary">+ 新增任務</el-button>
				</el-button-group>
      </div>
    </el-form>
    <ul class="lists">
      <li v-for="(item, index) in lists" :key="index" :class="{ 'status_star' : item.status_star }">
        <el-checkbox :id="'todo-' + index" v-model="item.status_checked">{{ item.title }}</el-checkbox>
        <el-button type="warning" v-model="item.status_star" :icon="icon" circle @click="onStarSwitch(index)"></el-button>
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <i class="el-icon-alarm-clock">{{ item.deadline | timeStamp | dateFormat('YYYY.MM.DD HH:mm') }}</i>
        <p class="lists__content" v-html="$options.filters.break(item.content)"></p>
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

<style lang="scss">
.main__input {
  margin: 24px 0;
  input {
    width: calc(100% - 35px);
		height: 65px;
		border-radius: 5px;
		background: #fff;
		border: 1px solid #c8c8c8;
		padding-left: 33px;
		font-size: 24px;
  }
}

.main__content {
  background: #f2f2f2;
  border: 1px solid #f2f2f2;
	padding: 24px 72px 0 72px;
	margin-top: -21px;
	border-radius: 5px;
}

.main__action {
  .el-button-group {
		width: 100%;
	}
	button {
		width: 50%;
		border-radius: 0;
		border: none;
		padding: 16px 0;
		font-size: 20px;
	}
	.el-button--default {
		color: #d0021b;
	}
	.el-button--primary {
		background: #4a90e2;
	}
}

.el-checkbox__input.is-checked+.el-checkbox__label {
  text-decoration: line-through;
}

.status_star {
  background: #fff2dc;
}
</style>