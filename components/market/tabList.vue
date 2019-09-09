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
    let operatorInfo = this.$store.state.exchangeMarket.currentOperatorInfo;
    this.tradePairs = operatorInfo && operatorInfo.tradePairs && Object.keys(operatorInfo.tradePairs) || [];
  },
  data() {
    return {
      tradePairs: [],
      curentCategory: 'VITE'
    };
  },
  computed: {
    quoteTokenCategory() {
      return this.isOperator ? this.tradePairs : this.$store.state.exchangeMarket.quoteTokenCategory;
    },
  },
  methods: {
    changeCategory(category) {
      this.curentCategory = category;
      this.$emit('currentCategory', category);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./center.scss";
</style>
