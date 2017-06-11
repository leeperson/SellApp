<template>
  <div>
    <div class="shopcart">
        <div class="content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalNum > 0}">
                        <span class="icon-close" :class="{'highlight':totalNum > 0}"></span>
                    </div>
                    <div class="num" v-show="totalNum > 0">{{ totalNum }}</div>
                </div>
                <div class="price" :class="{'highlight':totalNum > 0}">¥{{ totalPrice }}元</div>
                <div class="desc">另需配送费¥{{ deliveryPrice }}元</div>
            </div>
            <div class="content-right">
              <div class="pay" :class="payClass">
                {{ payDesc }}
              </div>
            </div>
        </div>
        <transition name=""fold>
          <div class="shopcart-list" v-show="ListShow">
            <div class="list-header">
              <h1 class="title">购物车</h1>
              <span class="empty">清除</span>
            </div>
            <div class="list-content" ref="listContent">
              <ul>
                <li v-for="food in selectFoods" class="food">
                  <span class="name">{{ food.name}}</span>
                  <div class="price">
                    <span>¥{{ food.price * food.count}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
    </div>
  </div>
</template>
<script>
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
export default {
  props: {
    selectFoods: {
      type: Array,
      default () {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      fold: true
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalNum () {
      let num = 0
      this.selectFoods.forEach((food) => {
        num += food.count
      })
      return num
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return '¥' + this.minPrice + '起送'
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return '还需¥' + diff + '起送'
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice >= this.minPrice) {
        return 'enough'
      } else {
        return 'not-enough'
      }
    },
    ListShow () {
      if (!this.totalNum) {
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  methods: {
    toggleList () {
      if (!this.totalNum) {
        return
      }
      this.fold = !this.fold
    }
  },
  components: {
    cartcontrol: cartcontrol
  }
}
</script>
<style scoped>
  .shopcart{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
  }
  .shopcart .content{
    display: flex;
    background: #141d27;
  }
  .content-left{
    flex: 1;
    font-size: 0;
  }
  .content-left .logo-wrapper{
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 50px;
    height: 50px;
    box-sizing: content-box;
    vertical-align: top;
    border-radius: 50%;
    background: #141d27;
  }
  .content-left .logo-wrapper .logo{
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #2b343c;
    text-align: center;
  }
  .content-left .logo-wrapper div.highlight{
    background: rgb(0,160,220)
  }
 .logo-wrapper .logo .icon-close{
     font-size: 24px;
     color: #88858a;
     line-height: 48px;
 }
 .logo-wrapper .logo span.highlight{
   color:#fff; 
 }
 .logo-wrapper .num{
   position: absolute;
   top: 0;
   right: 0;
   width: 24px;
   height: 16px;
   line-height: 16px;
   text-align: center;
   border-radius: 16px;
   font-size: 9px;
   font-weight: 700;
   color: #fff;
   background: rgb(240,20,20);
   box-shadow:0 4px 8px 0 rgba(0,0,0,.4);
 }
  .content-left .price{
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin-top: 12px;
    padding-right: 10px;
    box-sizing: border-box;
    border-right: 1px solid rgba(255,255,255,.1);
    font-size: 16px;
    font-weight: 700;
    color: rgba(225,225,225,.4)
  }
  .content-left .highlight{
    color: #fff;
  }
  .content-left .desc{
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin: 12px 0 0 12px;
    font-size: 10px;
    color: rgba(225,225,225,.4)
  }
  .content-right{
    flex: 0 0 105px;
    background: #2b333b;
  }
  .content-right .pay{
    height: 48px;
    line-height: 48px;
    text-align: center;
    color: rgba(225,225,225,.4);
    font-size: 12px;
    font-weight: 700;
  }
  .content-right .enough{
    background: #00b43c;
    color: #fff;
  }
  .content-right .not-enough{
    background: #2b333b;;
  }
  .shopcart-list{
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
  }
  .fold-enter-active, .fold-leave-active{
    transition: all 0.5s;
    transform: translate3d(0, -100%, 0);
  }
  .fold-enter, .fold-leave-active{
    transform: translate3d(0, 0, 0);
  }
  .list-header{
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .list-header .title{
    float: left;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .list-header .empty{
    float: right;
    font-size: 12px;
    color: rgb(0, 160, 220);
  }
  .list-content{
    padding: 0 18px;
    max-height: 217px;
    overflow: hidden;
    background: #fff;
  }
  .list-content .food{
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: rgba(7, 17, 27, 0.1);
  }
  .food .name{
    line-height: 24px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .food .price{
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20);
  }
  .food .cartcontrol-wrapper{
    position: absolute;
    right: 0;
    bottom: 6px;
  }
</style>
