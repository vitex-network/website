<template>
  <div>
    <div class="market-wrapper">
      <div class="is-flex">
        <tab-list :isOperator="true" @currentCategory="getCurrentCategory"></tab-list>
        <vitex-input 
          class="market-search-input is-hidden-mobile" 
          v-model="searchText"
          :placeholder="$t('marketTable.search')">
          <img slot="before" class="icon" src="~assets/images/operators/search.svg"/>
        </vitex-input>
      </div>

      <div class="__center-tb-title">
        <div class="__center-tb-item __pointer">
          <span class="describe-r">{{ $t('marketTable.header.txPair') }}</span>
          <order-arrow orderItem="txPair" :setOrderRule="setOrderRule"></order-arrow>
        </div>
        <div class="__center-tb-item">
            <span class="describe-r">{{ $t('marketTable.header.closePrice') }}</span>
            <order-arrow orderItem="price" :setOrderRule="setOrderRule"></order-arrow>
        </div>
        <div class="__center-tb-item percent">
            <span class="describe-r">{{ $t('marketTable.header.change') }}</span>
            <order-arrow orderItem="upDown" :setOrderRule="setOrderRule"></order-arrow>
        </div>
        <div class="__center-tb-item percent is-hidden-mobile">
            <span class="describe-r">{{ $t('marketTable.header.highPrice') }}</span>
            <order-arrow orderItem="highPrice" :setOrderRule="setOrderRule"></order-arrow>
        </div>
         <div class="__center-tb-item percent is-hidden-mobile">
            <span class="describe-r">{{ $t('marketTable.header.lowPrice') }}</span>
            <order-arrow orderItem="lowPrice" :setOrderRule="setOrderRule"></order-arrow>
        </div>
        <div  class="__center-tb-item is-hidden-mobile">
            <span class="describe-r">{{ $t('marketTable.header.amount') }}</span>
            <order-arrow orderItem="txNum" :setOrderRule="setOrderRule"></order-arrow>
        </div>
      </div>
      <table-list :list="activeTxPairList" :currentRule="currentOrderRule" :hasOperator="false"></table-list>
    </div>
  </div>
</template>
<script>
import tableList from './tableList.vue';
import tabList from './tabList.vue';
import VitexInput from './VitexInput.vue';
import { subTask } from '~/utils/proto/subTask';
import orderArrow from './orderArrow';
import { assignPair } from '~/services/trade';
let assignPairTimerList = [];

export default {
  components: {
    tableList,
    tabList,
    VitexInput,
    orderArrow
  },

  beforeMount() {
    this.stopAssignPair();
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
      quoteTokenCategory: 'VITE'
    };
  },
  computed: {
    activeTxPairList() {
      let list = this.searchText
        ? this.searchList 
        : this.txPairList;
      list = [].concat(list);

      return list;
    }
  },
  destroyed() {
    this.stopAssignPair();
  },
  watch: {
    '$i18n.locale': function() {
      this.searchText = '';
      this.searchList = [];
      this.stopAssignPair();
      this.init();
    },
    quoteTokenCategory() {
      this.searchText = '';
      this.searchList = [];
      this.stopAssignPair();

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
    getCurrentCategory(val) {
      this.quoteTokenCategory = val;
    },
    init() {
      let symbols = [];
      let tradePairs = this.$store.state.exchangeMarket.currentOperatorInfo.tradePairs;
      if (!tradePairs) return;
      symbols = tradePairs[this.quoteTokenCategory];
      assignPair({ symbols }).then(data => {
        this.txPairList = data;
        this.stopAssignPair();
        this.txPairList && this.txPairList.forEach(txPair => {
          const _t = new subTask('assignPair', ({ data }) => {
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
              return;
            }

            this.txPairList = [].concat(this.txPairList);
          });
          _t.start(() => {
            return { symbol: txPair.symbol };
          }, false);
          assignPairTimerList.push(_t);
        });
      })
        .catch(err=> {
          console.log(err);
        });
    },
    setOrderRule(rule) {
      this.currentOrderRule = rule;
    },
    stopAssignPair() {
      assignPairTimerList.forEach(assignTimer => {
        assignTimer && assignTimer.stop();
        assignTimer = null;
      });
      assignPairTimerList = [];
    },
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
    .icon {
        width: 16px;
        height: 16px;
        margin: 9px;
    }
}

</style>
