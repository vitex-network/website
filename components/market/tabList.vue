<template>
    <ul class="ex-tab-list">
        <li v-for="(c, i) in quoteTokenCategory" :key="i"
            :class="{
                'active': c === curentCategory,
            }" class="ex-tab __pointer"
            @click="changeCategory(c)"
        >{{ c }}</li>
    </ul>
</template>

<script>

export default {
  props: {
    isOperator: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.operatorInfo = this.$store.state.exchangeMarket.currentOperatorInfo;
    this.tradePairs = this.operatorInfo && Object.keys(this.operatorInfo.tradePairs) || [];
    console.log(this.tradePairs);
  },
  data() {
    return {
      tradePairs: []
    };
  },
  computed: {
    curentCategory() {
      return this.$store.state.exchangeMarket.curentCategory;
    },
    quoteTokenCategory() {
      return this.isOperator ? this.tradePairs : this.$store.state.exchangeMarket.quoteTokenCategory;
    },
  },
  methods: {
    changeCategory(category) {
      this.$store.commit('setCurentCategory', category);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./center.scss";
</style>
