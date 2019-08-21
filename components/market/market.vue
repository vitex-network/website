<template>
  <div>
    <div class="market-wrapper">
      <div class="is-flex">
        <tab-list></tab-list>
        <vitex-input 
          class="market-search-input" 
          v-model="searchText"
          :placeholder="`查询交易对`">
          <img slot="before" class="icon" src="~assets/images/search.svg"/>
        </vitex-input>
      </div>

      <div class="__center-tb-title">
        <div class="__center-tb-item __pointer">
            交易对
        </div>
        <div class="__center-tb-item __pointer">
            运营商
        </div>
        <div class="__center-tb-item">
            <span class="describe-r">最新价格</span>
            <order-arrow orderItem="price" :setOrderRule="setOrderRule"></order-arrow>
        </div>
        <div class="__center-tb-item percent">
            <span class="describe-r">24h变化</span>
            <order-arrow orderItem="upDown" :setOrderRule="setOrderRule"></order-arrow>
        </div>
        <div class="__center-tb-item percent">
            <span class="describe-r">24h最高</span>
            <order-arrow orderItem="upDown" :setOrderRule="setOrderRule"></order-arrow>
        </div>
         <div class="__center-tb-item percent">
            <span class="describe-r">24h最低</span>
            <order-arrow orderItem="upDown" :setOrderRule="setOrderRule"></order-arrow>
        </div>
        <div  class="__center-tb-item">
            <span class="describe-r">24h成交量</span>
            <order-arrow orderItem="txNum" :setOrderRule="setOrderRule"></order-arrow>
        </div>
      </div>
      <table-list :list="activeTxPairList" :currentRule="currentOrderRule"></table-list>
    </div>
  </div>
</template>
<script>
import tableList from './tableList.vue';
import tabList from './tabList.vue';
import VitexInput from '../VitexInput.vue';
import { subTask } from '~/utils/proto/subTask';
import orderArrow from './orderArrow';
let defaultPairTimer = null;

export default {
  components: {
    tableList,
    tabList,
    VitexInput,
    orderArrow
  },

  beforeMount() {
    this.init();
  },
  data() {
    return {
      searchText: '',
      txPairList: [],
      isLoading: false,
      searchList: [],
      rateTimer: null,
      currentOrderRule: 'txNumDown',
    };
  },
  computed: {
    quoteTokenCategory() {
      return this.$store.state.exchangeMarket.curentCategory;
    },
    activeTxPairList() {
      let list = this.searchText
        ? this.searchList 
        : this.txPairList;
      list = [].concat(list);

      return list;
    }
  },
  watch: {
    '$i18n.locale': function() {
      console.log('i18n');
      this.searchText = '';
      this.searchList = [];
      console.log(this.quoteTokenCategory);
      this.init();
    },
    quoteTokenCategory() {
      this.searchText = '';
      this.searchList = [];

      if (!this.quoteTokenCategory) {
        return;
      }
      this.init();
    },
    searchText: function () {
      const list = [];
      const searchText = this.searchText.trim().toLowerCase();
      this.txPairList.forEach(tx => {
        const ftokenShow = tx.tradeTokenSymbol.toLowerCase();
        if (ftokenShow.indexOf(searchText) !== -1) {
          list.push(tx);
        }
      });
      this.searchList = list;
    }
  },
  methods: {
    init() {
      defaultPairTimer = defaultPairTimer || new subTask('defaultPair', ({ args, data }) => {
        console.log('args.quoteTokenCategory');
        console.log(args.quoteTokenCategory);
        if (args.quoteTokenCategory !== this.quoteTokenCategory) {
          return;
        }

        this.isLoading = false;

        if (data instanceof Array) {
          this.txPairList = data || [];
          return;
        }

        if (!data) {
          return;
        }

        let i;
        for (i = 0; i < this.txPairList.length; i++) {
          if (this.txPairList[i].symbol === data.symbol) {
            this.txPairList[i] = data;
            break;
          }
        }

        if (i === this.txPairList.length) {
          this.txPairList.push(data);
          return;
        }

        this.txPairList = [].concat(this.txPairList);
      }, 2000);

      defaultPairTimer.start(() => {
        return { quoteTokenCategory: this.quoteTokenCategory };
      });
    },
    setOrderRule(rule) {
      this.currentOrderRule = rule;
    }
  }
  
};
</script>
<style lang="scss" scoped>
@import "./center.scss";
.market-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .describe-r {
      position: relative;
      bottom: 9px;
    }
}
.market-search-input.input-wrapper {
    box-sizing: border-box;
    line-height: 20px;

    .icon {
        width: 16px;
        height: 16px;
        margin: 9px;
    }

    input {
        text-indent: 0;
        font-weight: 400;
        font-size: 11px;
    }
}



</style>