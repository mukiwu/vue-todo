<template>
  <div class="progress">
    <lists :lists="lists"></lists>
  </div>
</template>

<script>
import {db} from '../db'
import lists from './components/lists'

export default {
  name: 'Progress',
  components: { lists },
  data() {
    return {
      lists: [],
    }
  },
  firestore: {
    lists: db.collection('lists').where('status_checked', '==', false)
  }
}
</script>