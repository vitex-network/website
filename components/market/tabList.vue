<template>
    <ul class="ex-tab-list">
        <li class="ex-tab __pointer">
            <span class="favorite-icon __pointer"></span>
        </li>
        <li v-for="(c, i) in quoteTokenCategory" :key="i"
            :class="{
                'active': c === curentCategory,
                'active-side': quoteTokenCategory[i-1] === curentCategory
            }" class="ex-tab __pointer"
            @click="changeCategory(c)"
        >{{ c }}</li>
    </ul>
</template>

<script>

export default {
  computed: {
    curentCategory() {
      return this.$store.state.exchangeMarket.curentCategory;
    },
    quoteTokenCategory() {
      return this.$store.state.exchangeMarket.quoteTokenCategory;
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
