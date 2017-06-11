<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2, $event)" class="block positive" :class="{'act': selectType === 2}">{{desc.all}}<span class="count">{{ ratings.length}}</span></span>
      <span @click="select(0, $event)" class="block positive" :class="{'act': selectType === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1, $event)" class="block negative" :class="{'active': selectType === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="{'on': onlyContent === true}">
      <span @click="toggle($event)" class="icon-keyboard_arrow_right"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
 const POSITIVE = 0
 const NEGATIVE = 1
 const ALL = 2
 export default {
   props: {
     ratings: {
       type: Array,
       default () {
         return []
       }
     },
     selectType: {
       type: Number,
       default: ALL
     },
     onlyContent: {
       type: Boolean,
       default: false
     },
     desc: {
       type: Object,
       default () {
         return {
           all: '全部',
           positive: '满意',
           negative: '不满意'
         }
       }
     }
   },
   methods: {
     select (type, event) {
       if (!event._constructed) {
         return
       }
       this.$emit('selects', type)
     },
     toggle (event) {
       if (!event._constructed) {
         return
       }
       this.$emit('toggles')
     }
   },
   computed: {
     positives () {
       return this.ratings.filter((rating) => {
         return rating.rateType === POSITIVE
       })
     },
     negatives () {
       return this.ratings.filter((rating) => {
         return rating.rateType === NEGATIVE
       })
     }
   }
 }
</script>

<style scoped>
   .rating-type{
     padding: 18px 0;
     margin: 0 18px;
     border-bottom: 1px solid rgba(7,17,27,.1);
     font-size: 0;
   }
   .block{
     display: inline-block;
     padding: 8px 12px;
     margin-right: 8px;
     border-radius: 1px;
     color: rgb(77,85,93);
     font-size: 12px;
     line-height: 16px;
     color: rgb(77,85,93);
   }
   .positive{
     background: rgba(0,160,220,.2);
   }
   .act{
     background: rgb(0,160,220);
     color: #fff;
   }
   .negative{
     background: rgba(77,85,93,.2);
   }
   .active{
     background: rgb(77,85,93);
     color: #fff;
   }
   .block .count{
     font-size: 8px;
     margin-left: 2px;
   }
   .switch{
     padding: 12px 18px;
     line-height: 24px;
     font-size: 0;
     color: rgb(147,153,159);
     border-bottom: 1px solid rgba(7,17,27,.1);
   }
   .switch .icon-keyboard_arrow_right{
     display: inline-block;
     vertical-align: top;
     font-size: 24px;
     margin-right: 4px;
   }
   .on .icon-keyboard_arrow_right{
     color: #00c858;
   }
   .switch .text{
     display: inline-block;
     font-size: 12px;
   }
</style>
