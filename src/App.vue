<template>
  <div id="app">
    <nav>
      <section>
        <ul>
          <li><router-link to="/">My Tasks</router-link></li>
          <li><router-link to="/progress">In Progress</router-link></li>
          <li><router-link to="/complete">Completed</router-link></li>
        </ul>
      </section>
    </nav>
    <section><router-view /></section>
    
  </div>
</template>

<script>
import '@/assets/css/app.scss'

export default {}
</script>