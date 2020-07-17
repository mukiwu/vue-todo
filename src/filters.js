export default {
  filters: {
    timeStamp: function(time) {
      return new Date(time.seconds * 1000)
    },
    break: function(str) {
      console.log('break')
      return str.replace(/\\n|\r\n/g,"<br/>")
    }
  }
}