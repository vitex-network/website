<template>
  <section class="section">
    <div class="container">
      <h1 style="margin-bottom: 50px">{{ $t("operator.detail.title") }}</h1>
      <operator></operator>
    </div>
  </section>
</template>
<script>
import operator from "~/components/operator/index";
import { operatorInfo } from "~/services/trade";

export default {
  components: {
    operator,
  },
  async beforeMount() {
    try {
      let list = await operatorInfo([]);
      let operatorInfoMap = {};
      list.forEach((item) => {
        operatorInfoMap[item.address] = item;
      });
      this.$store.commit("setOperatorInfo", operatorInfoMap);
    } catch (err) {
      console.log(err);
    }
    this.$store.commit("setCurrentOperator", this.$route.query.operator);
  },
  watch: {
    '$route.query.operator': function() {
      this.$store.commit("setCurrentOperator", this.$route.query.operator);
    }
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
@import "assets/vars.scss";
.section {
  padding-top: 92px;
  background: white;
  @include touch {
    padding-top: 25px;
  }
}
</style>


