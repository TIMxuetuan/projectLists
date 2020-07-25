<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo:''
    };
  },
  created(){
    if(this.userInfo != ''){
     this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
    }else{
      this.userInfo = localStorage.getItem("userInfo")
    }
     console.log(this.userInfo)
    if(this.userInfo == '' || this.userInfo == null){
      console.log(111)
      this.$router.push("./");
    }
  }
};
</script>

<style lang="less">
html {
  font-size: 16px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 12px;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
