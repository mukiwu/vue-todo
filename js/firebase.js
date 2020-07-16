const firebaseConfig = {
  apiKey: "AIzaSyB0Sskf0ZH0k7PWJrsrxpk7nE4Lu_EzMY8",
  authDomain: "vue-todo-2f323.firebaseapp.com",
  databaseURL: "https://vue-todo-2f323.firebaseio.com",
  projectId: "vue-todo-2f323",
  storageBucket: "vue-todo-2f323.appspot.com",
  messagingSenderId: "156071056601",
  appId: "1:156071056601:web:2f02d25fbc3b4cd896dac8",
  measurementId: "G-LZZ7DR097E"
}
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()