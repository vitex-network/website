<template>
  <div class="is-flex sub-title-wrapper">
    <div class="dot"></div>
    <div class="desc">交易挖矿总收益 <span>46719.12 VX</span></div>
  </div>
</template>
<script>
export default {
  
};
</script>
<style lang="scss" scoped>
.sub-title-wrapper {
  align-items: center;
  margin: 32px 0px;
}
.dot {
  width:6px;
  height:6px;
  background:rgba(47,91,234,1);
  border-radius:4px;
}
.desc {
  margin-left: 7px;
  font-size:14px;
  font-family:PingFangSC;
  font-weight:400;
  color:rgba(84,86,90,1);
  line-height:24px;
  span {
    font-size:20px;
    font-weight:600;
    color:rgba(17,17,17,1);
    line-height:28px;
  }
}
</style>


