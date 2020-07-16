<template>
  <div class="home">
    <div class="main__input">
      <input type="text" placeholder="+ Add Task" required v-if="!todoShow" @click="todoShow=true">
      <input type="text" placeholder="Type Something Here..." v-if="todoShow">
    </div>
    <div class="main__content" v-if="todoShow">
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      todoShow: false
    }
  }
}
</script>

<style lang="scss">
.main__input {
  margin: 24px 0;
  input {
    width: 100%;
		height: 65px;
		border-radius: 5px;
		background: #fff;
		border: 1px solid #c8c8c8;
		padding-left: 33px;
		font-size: 24px;
  }
}
</style>