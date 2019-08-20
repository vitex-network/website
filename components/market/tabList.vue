<template>
    <ul class="vitex-tab-list">
        <li v-for="(c, i) in categoryList" :key="i"
            :class="{
                'active': c.symbol === currentMarket,
                'active-side': (i === 0) || (categoryList[i-1] && categoryList[i-1].symbol === currentMarket)
            }" class="vitex-tab __pointer"
            @click="changeCategory(c)">
            {{ c.originalSymbol }}
        </li>
    </ul>
</template>

<script>

export default {
  computed: {
    currentMarket() {
      console.log('currentMarket', this.$store.state.exchangeMarket.currentMarket);
      return this.$store.state.exchangeMarket.currentMarket;
    },
    categoryList() {
      return this.$store.state.exchangeMarket.marketMap;
    }
  },
  data() {
    return {
      viewCategory: ''  
    };
  },
  methods: {
    changeCategory(c) {
      this.$store.commit('setCurrentMarket', c.symbol);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./center.scss";
</style>
