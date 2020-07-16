<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <ul v-for="(item , index) in fruit" :key="index">
      <li>{{ item.sale }}</li>
    </ul>
    <div @click="addFruit()">新增香蕉</div>
  </div>
</template>

<script>
import {db} from '../db'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      fruit: []
    }
  },
  firestore: {
    fruit: db.collection('fruit'),
  },
  methods: {
    addFruit() {
      let ref = db.collection('fruit').doc('banana')
      ref.set({
        total: 500,
        good: 480,
        sale: 330
      }).then(function() {
        console.log('set data successful')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
