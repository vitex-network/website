<template>
    <ul class="vitex-tab-list">
        <li v-for="(c, i) in quoteTokenCategory" :key="i"
            :class="{
                'active': c === curentCategory,
                'active-side': (i === 0) || (quoteTokenCategory[i-1] === curentCategory)
            }" class="vitex-tab __pointer"
            @click="changeCategory(c)">
            {{ c }}
        </li>
    </ul>
</template>

<script>

export default {
  data() {
    return {
      curentCategory: 'USDT'
    };
  },
  computed: {
    quoteTokenCategory() {
      return [ 'USDT', 'BTC', 'ETH', 'VITE' ];
    }
  },
  methods: {
    changeCategory(category) {
      this.curentCategory = category;
    }
  }
};
</script>

<style lang="scss" scoped>
.vitex-tab-list {
    display: flex;
    display: -webkit-flex;
    padding-top: 4px;
    width: 100%;
    background: rgba(243,245,249,1);
    padding: 4px 0 0px 0;
    .vitex-tab {
        display: inline-block;
        font-size: 13px;
        font-weight: 600;
        line-height: 27px;
        padding: 0px 6px 3px;
        color: rgba(29,32,36,0.6);
        border-left: 1px solid rgba(205,204,204,1);
        &:first-child {
            border: none;
        }
        &.active-side {
            border: none;
        }
        &.active {
            border: none;
            padding-top: 6px;
            background: #fff;
            line-height: 17px;
            border-radius: 4px 4px 0px 0px;
        }
    }
}
</style>
