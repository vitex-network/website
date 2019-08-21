<template>
    <div>
        <div class="market-wrapper">
          <tab-list></tab-list>
          <vitex-input 
            class="market-search-input" 
            v-model="searchText"
            :placeholder="`请搜索`">
            <img slot="before" class="icon" src="~assets/images/search.svg"/>
          </vitex-input>
          <table-list :list="activeTxPairList"></table-list>
        </div>
    </div>
</template>
<script>
import tableList from './tableList.vue';
import tabList from './tabList.vue';
import VitexInput from '../VitexInput.vue';
import { subTask } from '~/utils/proto/subTask';
let defaultPairTimer = null;

export default {
  components: {
    tableList,
    tabList,
    VitexInput
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
      rateTimer: null
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
    quoteTokenCategory() {
      this.searchText = '';
      this.searchList = [];

      if (!this.quoteTokenCategory) {
        return;
      }
      this.init();
    },
  },
  methods: {
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
    }
  }
};
</script>
<style lang="scss" scoped>
.market-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
.market-search-input.input-wrapper {
    box-sizing: border-box;
    height: 20px;
    line-height: 20px;
    border: none;

    .icon {
        width: 12px;
        height: 12px;
        margin: 4px 6px 4px 6px;
    }

    input {
        text-indent: 0;
        font-weight: 400;
        font-size: 11px;
        background: rgba(245, 250, 255, 1);
    }
}



</style>