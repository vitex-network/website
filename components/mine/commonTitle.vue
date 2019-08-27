<template>
  <div class="is-flex sub-title-wrapper">
    <div class="dot"></div>
    <div class="desc">{{ name }} <span>{{ amount }} VX</span></div>
  </div>
</template>
<script>
export default {
  props: ['name', 'amount']
};
</script>
<style lang="scss" scoped>
@import "~assets/vars.scss";

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
  font-family:$font-family-light;
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


