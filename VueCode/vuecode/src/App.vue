<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <mytextbox :tvalue="msg" @tupdate="tupdated" :tchanged="alertChange"></mytextbox>
  </div>
</template>

<script>
import mytextbox from './components/textinput/textinput';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to my Vue Code',
      idm:  'mnk'
    }
  },
  components : {
    mytextbox : mytextbox
  },
  methods : {
    tupdated (updatedMsg){
      this.msg  = updatedMsg;
    },
    alertChange(valc){
      this.$emit('mn',valc.target.value);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
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
