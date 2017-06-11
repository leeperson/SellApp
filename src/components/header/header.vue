<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" v-bind:src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟到达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div class="content-count" v-if="seller.supports" @click="showDetial">
        <span class="count">{{ seller.supports.length }}个</span>
        <span class="icon-thumb_up"></span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetial">
      <span class="bulletin-title"></span><span class="bulletin-text">{{ seller.bulletin }}</span>
      <span class="icon-thumb_up" @click=""></span>
    </div>
    <div class="background">
      <img v-bind:src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade" mode="out-in">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1>{{ seller.name }}</h1>
            <div class="star-wrapper">
              <star :size="36" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="supports-item" v-for="item in seller.supports">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{ item.description }}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p>{{ seller.bulletin }}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <span class="icon-remove_circle_outline"></span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import star from '@/components/star/star'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetial () {
        this.detailShow = true
      },
      hideDetail () {
        this.detailShow = false
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'invoice', 'guarantee', 'special']
    },
    components: {
      star
    }
  }
</script>
<style scoped>
  .header{
    position: relative;
    background: rgba(7, 17, 27, .5);
    color: #fff;
    overflow: hidden;
  }
  .content-wrapper{
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
  }
  .content-wrapper .avatar{
    display: inline-block;
    vertical-align: top;
  }
  .avatar img{
    border-radius: 2px;
  }
  .content-wrapper .content{
    display: inline-block;
    margin-left: 16px;
  }
  .content .title{
    margin: 2px 0 8px 0;
  }
  .content .title .brand{
    display: inline-block;
    vertical-align: top;
    width: 30px;
    height: 18px;
    background: url('brand@2x.png') no-repeat;
    background-size: 30px 18px;
  }
  .content .title .name{
    font-weight: bold;
    margin-left: 6px;
    font-size: 16px;
    line-height: 18px;
  }
   .content .description{
     margin-bottom: 10px;
     font-size: 12px;
     line-height: 12px;
   }
   .support .icon{
     display: inline-block;
     vertical-align: top;
     width: 12px;
     height: 12px;
     margin-right: 4px;
     background-size: 12px 12px;
     background-repeat: no-repeat;
   }
   .support .decrease{
     background-image: url('decrease_1@2x.png')
   }
   .support .discount{
     background-image: url('discount_1@2x.png')
   }
   .support .invoice{
     background-image: url('invoice_1@2x.png')
   }
   .support .guarantee{
     background-image: url('guarantee_1@2x.png')
   }
   .support .special{
     background-image: url('special_1@2x.png')
   }
   .support .text{
     line-height: 12px;
     font-size: 10px;
   }
   .content-wrapper .content-count{
     position: absolute;
     right: 12px;
     bottom: 14px;
     padding: 0 8px;
     height: 24px;
     line-height: 24px;
     border-radius: 14px;
     background: rgba(0,0,0,.2)
   }
   .content-count .count{
     vertical-align: top;
      font-size: 10px;
   }
   .content-count .icon-thumb_up{
     font-size: 10px;
     line-height: 24px;
     margin-left: 2px;
   }
   .bulletin-wrapper{
     position: relative;
     height: 28px;
     line-height: 28px;
     padding: 0 22px 0 12px;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
     background: rgba(7,17,27,0.2)
   }
   .bulletin-wrapper .bulletin-title{
     display: inline-block;
     vertical-align: middle;
     width: 22px;
     height: 12px;
     background: url('bulletin@2x.png') no-repeat;
     background-size: 22px 12px;
   }
   .bulletin-wrapper .bulletin-text{
     font-size: 10px;
     line-height: 28px;
     margin: 0 4px;
   }
   .bulletin-wrapper .icon-thumb_up{
     position: absolute;
     right: 3px;
     top: 10px;
     font-size: 10px;
     vertical-align: middle;
   }
   .header .background{
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     filter: blur(5px);
     z-index: -1;
   }
   .fade-enter {
     opacity:0;
   }
    .fade-leave{
      opacity:1;
    }
    .fade-enter-active{
      transition:opacity 1s;
    }
    .fade-leave-active{
      opacity:0;
      transition:opacity 1s;
    }
   .header .detail{
     position: fixed;
     top: 0;
     left: 0;
     z-index: 100;
     width: 100%;
     height: 100%;
     background: rgba(7, 17, 27, .8);
     overflow: auto;
   }
   .header .detail .detail-wrapper{
     min-height: 100%;
     width: 100%;
   }
   .detail-wrapper .detail-main{
     margin-top: 64px;
     padding-bottom: 64px;
   }
   .detail-wrapper .detail-main h1{
     font-size: 16px;
     font-weight: 700;
     text-align: center;
     line-height: 16px;
   }
   .detail-wrapper .detail-main .star-wrapper{
      margin-top: 18px;
      padding: 2px 0;
      text-align: center;
   }
   .detail-wrapper .detail-main .title{
     display: flex;
     width: 80%;
     margin: 28px auto 24px auto;
   }
   .detail-wrapper .detail-main .title .line{
     flex: 1;
     position: relative;
     top: -6px;
     border-bottom: 1px solid rgba(225,225,225,.2)
   }
   .detail-wrapper .detail-main .title .text{
     font-size: 14px;
     font-weight: 700;
     margin: 0 12px;
   }
   .detail-wrapper .detail-main ul{
     width: 80%;
     margin: 0 auto
   }
    .detail-wrapper .detail-main ul li{
     padding: 0 12px;
     margin-bottom: 18px;
   }
   .detail-wrapper .detail-main ul li:last-child{
     margin-bottom: 0;
   }
   .detail-wrapper .detail-main ul li .icon{
     display: inline-block;
     vertical-align: middle;
     width: 16px;
     height: 16px;
     margin-right: 6px;
     background-size: 16px 16px;
     background-repeat: no-repeat;
   }
   .detail-wrapper .detail-main .supports .decrease{
     background-image: url('decrease_2@2x.png')
   }
   .detail-wrapper .detail-main .supports .discount{
     background-image: url('discount_2@2x.png')
   }
   .detail-wrapper .detail-main .supports .invoice{
     background-image: url('invoice_2@2x.png')
   }
   .detail-wrapper .detail-main .supports .guarantee{
     background-image: url('guarantee_2@2x.png')
   }
   .detail-wrapper .detail-main .supports .special{
     background-image: url('special_2@2x.png')
   }
   .detail-wrapper .detail-main .supports .text{
     line-height: 16px;
     font-size: 12px;
     font-weight: 200;
   }
   .detail-wrapper .detail-main .bulletin{
     width: 80%;
     margin: 0 auto
   }
   .detail-wrapper .detail-main .bulletin p{
     padding: 0 12px;
     line-height: 24px;
     font-size: 12px;
   }
  .header .detail .detail-close{
     position: relative;
     width: 32px;
     height: 32px;
     margin: -64px auto 0 auto;
     clear: both;
     font-size: 32px;
   }
</style>
