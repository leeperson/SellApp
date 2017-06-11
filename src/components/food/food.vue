<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-add_circle"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{ food.name}}</h1>
          <div class="detial">
            <span class="sell-count">月售{{ food.sellCount}}份</span>
            <span class="rating">好评率{{ food.rating }}%</span>
          </div>
          <div class="price">
            <span class="now">¥{{ food.price}}</span>
            <span class="old" v-show="food.oldPrice">¥{{ food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
          </div>
          <div @click.stop.prevent="addFirst($event)" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
        </div>
        <split v-show="food.info"></split>
        <div class="info">
          <div class="title">商品信息</div>
          <p class="food-info" v-show="food.info">{{ food.info }}</p>
        </div>
        <split></split>
        <div class="rating">
          <div class="title">商品评价</div>
          <ratingselect @selects="selectTypes" @toggles="toggleContents" :ratings="food.ratings" :only-content="onlyContent" :select-type="selectType" :desc="desc"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" class="avatar" width="12" height="12">
                </div>
                <div class="time">{{rating.rateTime | formateDate}}</div>
                <p class="text">
                  <span :class="{'icon-arrow_lift': rating.rateType === 0, 'icon-check_circle': rating.rateType === 1}"></span>{{ rating.text }}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import BScroll from 'better-scroll'
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import ratingselect from '@/components/ratingselect/ratingselect'
import split from '@/components/split/split'
import Vue from 'vue'
import {turn} from '@/common/js/date.js'
const ALL = 2
// const POSITIVE = 0
// const NEGATIVE = 1
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false,
      onlyContent: true,
      selectType: ALL,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show () {
      this.showFlag = true
      this.onlyContent = true
      this.selectType = ALL
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    addFirst () {
      if (!event._constructed) {
        return
      }
      Vue.set(this.food, 'count', 1)
    },
    selectTypes (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    toggleContents () {
      this.onlyContent = !this.onlyContent
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    needShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return this.selectType === type
      }
    }
  },
  filters: {
    formateDate (time) {
      let date = new Date(time)
      return turn(date)
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  }
}
</script>
<style scoped>
  .food{
      position: fixed;
      left: 0;
      top: 0;
      bottom: 48px;
      z-index: 30;
      width: 100%;
      background: #fff;
      transition: all .3s linear;
  }
  .move-enter{
    transform: translate3d(0,0,0);
  }
   .move-enter-active{
    transform: translate3d(100%,0,0);
  }
  .move-leave{
    transform: translate3d(0,0,0);
  }
  .move-leave-active{
    transform: translate3d(100%,0,0);
  }
  .image-header{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
  }
  .image-header img{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .back{
    position: absolute;
    top: 10px;
    left: 0;
  }
 .icon-add_circle{
   display: block;
   padding: 10px;
   font-size: 20px;
   color: #fff;
 }
 .content{
   position: relative;
    padding: 18px;
 }
 .title{
   line-height: 14px;
   margin-bottom: 8px;
   font-size: 14px;
   font-weight: 700;
   color: rgb(7.17.27);
 }
 .detial{
   margin-bottom: 18px;
   line-height: 8px;
   height: 10px;
   font-size: 0;
 }
 .detial .sell-count,.detial .rating{
   font-size: 10px;
   color: rgb(147,153,150)
 }
 .detial .sell-count{
   margin-right: 20px;
 }
  .content .price{
    font-weight: 700;
    line-height: 24px;
  }
  .content .price .now{
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240,20,20)
  }
  .content .price .old{
    text-decoration: line-through;
    font-size: 10px;
    color: rgb(147,153,159)
  }
  .cartcontrol-wrapper{
    position: absolute;
    right: 12px;
    bottom: 12px;
  }
  .buy{
    position: absolute;
    right: 18px;
    bottom: 18px;
    z-index: 10;
    height: 24px;
    line-height: 24px;
    padding: 0 12px;
    box-sizing: border-box;
    font-size: 10px;
    border-radius: 12px;
    color: #fff;
    background: rgb(0,160,220)
  }
  .info{
    padding: 18px;
  }
  .info .title{
    line-height: 14px;
    margin-bottom: 6px;
    font-size: 14px;
    color: rgb(7,17,27)
  }
  .info .food-info{
    line-height: 24px;
    padding: 0 8px;
    font-size: 12px;
    color: rgb(77,82,93)
  }
  .rating{
     padding-top: 18px
  }
  .rating .title{
    line-height: 14px;
    margin-left: 18px;
    font-size: 14px;
    color: rgb(7,17,27)
  }
  .rating-wrapper{
    padding: 0 18px;
  }
  .rating-item{
    position: relative;
    padding: 16px 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .rating-item .user{
    position: absolute;
      right: 0;
      top: 16px;
      line-height: 12px;
      font-size: 0;
  }
  .user .name{
    display: inline-block;
    margin-right: 6px;
    margin-top:3px;
    vertical-align: top;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .user .avatar{
    border-radius: 50%;
  }
  .rating-item .time{
    margin-bottom: 6px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .rating-item .text{
    line-height: 16px;
    font-size: 12px;
    color: rgb(7, 17, 27);
  }
  .text .icon-arrow_lift,
  .text .icon-check_circle{
     margin-right: 4px;
     line-height: 16px;
     font-size: 12px;
  }
  .text .icon-arrow_lift{
    color: rgb(0, 160, 220);
  }
  .text .icon-check_circle{
    color: rgb(147, 153, 159);
  }
  .no-rating{
    padding: 16px 0;
    font-size: 12px;
    color: rgb(147, 153, 159);
   }
</style>

