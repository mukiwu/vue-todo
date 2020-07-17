<template>
  <div class="complete">
    <div v-if="lists.length === 0">
      <el-divider></el-divider>
      <el-alert title="尚未有完成的待辦事項" type="info" effect="dark" :closable="false" center></el-alert>
    </div>
    <lists :lists="lists"></lists>
  </div>
</template>

<script>
import {db} from '../db'
import lists from './components/lists'

export default {
  name: 'Complete',
  components: { lists },
  data() {
    return {
      lists: []
    }
  },
  firestore: {
    lists: db.collection('lists').where('status_checked', '==', true).orderBy('create_time','asc')
  }
}
</script>