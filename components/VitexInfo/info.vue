<template>
  <div class="info">
    <item
        :itemKey="'dex'"
    ></item>

    <item
        :itemKey="'performance'"
    ></item>
    <item
        :itemKey="'mine'"
    ></item>
    <item
        :itemKey="'open'"
    ></item>
  </div>
</template>

<script type="text/babel">
  import item from './infoItem';
  export default {
    components: {
      item
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~assets/vars";
  .info{
    display:flex;
    padding-top: 40px;
    justify-content: space-between;
  }
</style>
