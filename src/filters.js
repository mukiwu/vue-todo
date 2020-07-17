export default {
  filters: {
    timeStamp: function(time) {
      return new Date(time.seconds * 1000)
    },
    break: function(str) {
      return str.replace(/\n|\r\n/g,"<br/>")
    }
  }
}