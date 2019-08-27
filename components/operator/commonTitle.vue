<template>
  <div class="is-flex sub-title-wrapper">
    <div class="dot"></div>
    <div class="desc">{{ title }}</div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
  
};
</script>
<style lang="scss" scoped>
@import "~assets/vars.scss";
.sub-title-wrapper {
  align-items: center;
  margin-top: 40px;
  margin-bottom: 20px;
}
.dot {
  width:6px;
  height:6px;
  background:rgba(47,91,234,1);
  border-radius:4px;
}
.desc {
  margin-left: 7px;
  font-size:20px;
  font-family:$font-family-light;
  font-weight:600;
  color:rgba(23,28,52,1);
  line-height:24px;
}
</style>


