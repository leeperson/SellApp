<template>
  <div class="cartcontrol">
      <transition name="move">
        <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart($event)">
            <div class="inner icon-shopping_cart"></div>
        </div>
      </transition>
    <div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="cart-add icon-thumb_down" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    decreaseCart (event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count > 0) {
        this.food.count--
      }
    }
  }
}
</script>
<style>
  .cartcontrol{
     font-size: 0;  
  }
  .cart-decrease{
    display: inline-block;
    padding: 6px;
    transition: all 0.4s linear;
  }
  .move-enter{
      opacity: 1;
      transform: translate3d(48px,0,0);
  }
  .move-enter-active{
      opacity: 0;
      transform: translate3d(0,0,0);
  }
  .cart-decrease .inner{
    display: inline-block;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0,160,220);
  }
  .move-leave{
      opacity: 0;
      transform: translate3d(0,0,0)
  }
  .move-leave-active{
      opacity: 1;
      transform: translate3d(24px,0,0);
  }
  .cart-count{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147,153,159)
  }
  .cart-add{
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0,160,220)
  }
</style>

