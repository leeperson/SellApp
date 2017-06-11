<template>
  <div id="app">
    <v-header v-bind:seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  var ERR_OK = 0
  import header from './components/header/header'
  export default {
    data () {
      return {
        seller: {}
      }
    },
    created () {
      this.$http.get('/api/seller').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.seller = response.data
        }
      })
    },
    components: {
      vHeader: header
    }
  }
</script>

<style>
  #app .tab{
    position: relative;
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  #app .tab::after{
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    content: ' ';
    border-top: 1px solid rgba(7,17,27,.1)
  }
  .tab .tab-item{
    flex:1;
    text-align: center;
  }
  .tab .tab-item a{
    display: block;
    text-decoration: none;
    font-size: 14px;
    color: rgb(77, 85, 93)
  }
  .tab .tab-item a.active{
    color: rgb(240, 20, 20)
  }
</style>
