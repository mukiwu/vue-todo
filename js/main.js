let ref = db.collection('fruit').doc('apple')
ref.set({
  total: 500,
  good: 480,
  sale: 330
}).then(function() {
  console.log('set data successful')
})