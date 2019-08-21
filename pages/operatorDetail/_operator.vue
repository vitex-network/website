<template>
  <section class="section">
      <div class="container">
        <h1 style="margin-bottom: 50px;">运营商详情</h1>
        <operator :name="operatorName"></operator>
      </div>
    </section>
</template>
<script>
import operator from '~/components/operator/index';

export default {
  components: {
    operator
  },
  created() {
    console.log(this.$route.params.operator);  // 运营商名字信息
  },
  computed: {
    operatorName() {
      return this.$route.params.operator;
    }
  }
};
</script>
<style lang="scss" scoped>
 @import "assets/vars.scss";
  .section {
    padding-top: 92px;
    background:white;
    @include touch {
      padding-top: 25px;
    }
  }
</style>


