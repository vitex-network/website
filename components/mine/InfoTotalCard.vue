<template>
    <div class="info-total-wrapper">
      <div class="item" v-for="(item, index) in totalInfo" :key="index">
        <div>{{ item.name }}</div>
        <div class="value">{{ item.amount || '--'}}</div>
      </div>
    </div>
</template>
<script>


export default {
  props: {
    totalInfo: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/vars.scss";
.info-total-wrapper {
  margin-top: 30px;
  background: url("~assets/images/index/bg.png") no-repeat center;
  background-color: white;
  box-shadow:0px 2px 9px 0px rgba(0,0,0,0.07);
  border-radius:5px;
  height:80px;
  display: flex;
  display: -webkit-flex;
  @include mobile {
    flex-direction: column;
    height: auto;
    border-radius:none;
    background: none;
    box-shadow:none;
  }
  .item:last-child {
    border-right:none;
  }
}
.item {
  width: 50%;
  border-right: 1px solid #E7EAEE;
  padding: 20px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  font-family: $font-family-light;
  font-size:14px;
  color:rgba(23,28,52,1);
  line-height:40px;
  @include mobile {
    width: 100%;
    line-height:18px;
    flex-direction: column;
    border:1px solid rgba(0,60,255,0.02);
    border-radius:2px;
    background: url("~assets/images/index/bg.png") no-repeat center;
    background-size: cover;
    background-color: white;
    margin-bottom: 10px;
    height: 102px;
  }
  .value {
    font-family: $font-family-title;
    color:rgba(23,28,52,1);
    font-size:22px;
    @include mobile {
      font-size: 22px;
      line-height: 26px;
      margin-top: 16px;
    }
  }
}
</style>