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

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background: #e1e1e1;
	font-family: arial, sans-serif;
	font-size: 16px;
	line-height: 160%;
}

section {
  width: 620px;
	margin: 0 auto;
}

nav {
  background: #4a90e2;
	font-size: 24px;
	color: #00408b;
  ul {
    margin: 0;
    padding: 0;
  }
  li {
    display:inline-block
  }
	a {
		display: inline-block;
		text-align: center;
		padding: 24px 0 19px 0;
		border-bottom: 5px solid #4a90e2;
		width: 174px;
		margin: 0 10px;
    text-decoration: none;
		&.current, &:hover {
			color: #fff;
			cursor: pointer;
			border-bottom: 5px solid #00408b;
		}
	}
}
</style>
