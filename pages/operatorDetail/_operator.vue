<template>
  <section class="section">
      <div class="container">
        <h1 style="margin-bottom: 50px;">运营商详情</h1>
        <operator :operator-info="operatorInfo"></operator>
      </div>
    </section>
</template>
<script>
import operator from '~/components/operator/index';
import { operatorInfo } from '~/services/trade';

export default {
  components: {
    operator
  },
  async beforeMount() {
    let list = await operatorInfo([this.$route.params.operator]);
    this.operatorInfo = list[0];
  },
  computed: {
  },
  data() {
    return {
      operatorInfo: {}
    };
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


