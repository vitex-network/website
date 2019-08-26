<template>
  <div>
    <div class="index-main-title">{{ $t('marketTable.title') }}</div>
    <div class="market-wrapper">
      <div class="is-flex">
        <tab-list @currentCategory="getCurrentCategory"></tab-list>
        <vitex-input 
          class="market-search-input is-hidden-mobile" 
          v-model="searchText"
          :placeholder="$t('marketTable.search')">
          <img slot="before" class="icon" src="~assets/images/search.svg"/>
        </vitex-input>
      </div>

      <div class="__center-tb-title">
        <div class="__center-tb-item __pointer">
          {{ $t('marketTable.header.txPair') }}
        </div>
        <div class="__center-tb-item __pointer is-hidden-mobile">
          {{ $t('marketTable.header.operator') }}
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
      <table-list :list="activeTxPairList" :currentRule="currentOrderRule"></table-list>
    </div>
  </div>
</template>
<script>
import tableList from './tableList.vue';
import tabList from './tabList.vue';
import VitexInput from './VitexInput.vue';
import { subTask } from '~/utils/proto/subTask';
import orderArrow from './orderArrow';
import { operatorFetcher } from './operator.js';
let defaultPairTimer = null;

export default {
  components: {
    tableList,
    tabList,
    VitexInput,
    orderArrow
  },

  beforeMount() {
    this.quoteTokenCategory = 'BTC';
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
      quoteTokenCategory: 'BTC'
    };
  },
  destroyed() {
    this.stopDefaultPair();
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
  watch: {
    '$i18n.locale': function() {
      this.searchText = '';
      this.searchList = [];
      this.stopDefaultPair();
      this.init();
    },
    quoteTokenCategory() {
      this.searchText = '';
      this.searchList = [];
      this.stopDefaultPair();

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
    },
    async txPairList(val) {
      let operatorMap = await operatorFetcher.getOperators(val);
      for(let i = 0; i < val.length; i++) {
        for(let key in operatorMap) {
          if (val[i].symbol === key) {
            this.$set(val[i], 'operatorName', operatorMap[key].gateway);
          } 
        }
      }
    }
  },
  methods: {
    getCurrentCategory(val) {
      this.quoteTokenCategory = val;
    },
    init() {
      defaultPairTimer = defaultPairTimer || new subTask('defaultPair', ({ args, data }) => {
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
    },
    stopDefaultPair() {
      defaultPairTimer && defaultPairTimer.stop();
      defaultPairTimer = null;
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
    @include mobile {
      padding: 0 20px;
    }
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
