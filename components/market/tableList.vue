<template>
   <el-table
    :data="showList"
    style="width: 100%">
    <el-table-column
      prop="txPair"
      label="交易对"
      sortable
      :formatter="getTxPairShowSymbol">
    </el-table-column>
    <el-table-column
      prop="operator"
      label="运营商">
    </el-table-column>
    <el-table-column
      prop="closePrice"
      label="最新价格"
      sortable
      :formatter="formatClosePrice">
    </el-table-column>
    <el-table-column
      prop="address"
      label="24h变化"
      sortable
      :formatter="formatter">
    </el-table-column>
    <el-table-column
      prop="address"
      label="24h最高">
    </el-table-column>
    <el-table-column
      prop="address"
      label="24h最低">
    </el-table-column>
    <el-table-column
      prop="address"
      label="24h成交量"
      sortable>
    </el-table-column>
  </el-table>
</template>

<script>
import BigNumber from '~/utils/bigNumber';
import { rateToken, baseToken } from '~/services/trade.js';
import { timer } from '~/utils/asyncFlow.js';
const loopTime = 10000;

export default {
  props: {
    currentRule: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    },
    showCol: {
      type: String,
      default: 'updown'
    }
  },
  data() {
    return {
      symbol: null,
      realPrice: '',
      rateTimer: null,
      rateTokenIds: []
    };
  },
  beforeMount() {
    this.startLoopExchangeRate();
  },
  computed: {
    showList() {
      this.rateTokenIds = [];
      let list = this.list.map(item=> {
        this.rateTokenIds.push(item.tradeToken);
        return {
          ...item,
          operator:'VGATE'
        };
      });
      console.log(list);
      
      return list;
    }
  },
  methods: {
    stopLoopExchangeRate() {
      this.rateTimer && this.rateTimer.stop();
      this.rateTimer = null;
    },
    startLoopExchangeRate() {
      this.stopLoopExchangeRate();
      const f = () => {
        if (!this.rateTokenIds || !this.rateTokenIds.length) {
          return;
        }
        return rateToken({ tokenIdList: this.rateTokenIds }).then(data => {
          console.log(data);
        });
      };

      this.rateTimer = new timer(f, loopTime);
      this.rateTimer.start();
    },
    formatClosePrice(row) {
      let closePrice = BigNumber.formatNum(row.closePrice, row.pricePrecision);
      let realPrice = this.getRealPrice(row);
      return closePrice/realPrice;
    },
    getTxPairShowSymbol(row) {
      const tradeTokenSymbol = row.tradeTokenSymbol.split('-')[0];
      const quoteTokenSymbol = row.quoteTokenSymbol.split('-')[0];
      return `${ tradeTokenSymbol }/${ quoteTokenSymbol }`;
    },
    /// todo 
    formatter(row, column) {
      return '';
    //   return row.address;
    },
    getPercent(num) {
      return `${ BigNumber.multi(num, 100, 2) }%`;
    },
    formatNum(num, fix) {
      return BigNumber.formatNum(num, fix);
    },
    getRealPrice(txPair) {
      console.log(txPair);
      if (!txPair) {
        return;
      }

    
      const rate = this.getRate(txPair.quoteToken);
      if (!rate) {
        return '--';
      }

      const price = BigNumber.multi(txPair.closePrice || 0, rate || 0, 2);
      if (!+price) {
        return '--';
      }

      const pre = this.$i18n.locale === 'zh' ? '¥' : '$';
      return `${ pre }${ price }`;
    },
    getRate(tokenId) {

      const rateList =  {};
      const coin = '';

      if (!tokenId || !rateList[tokenId]) {
        return null;
      }

      return rateList[tokenId][`${ coin }Rate`] || null;
    },
    orderList(list) {
      const compareStr = (aStr, bStr) => {
        for (let i = 0; i < aStr.length; i++) {
          if (!bStr[i]) {
            return 1;
          }

          return aStr[i].charCodeAt() - bStr[i].charCodeAt();
        }

        return -1;
      };

      return list.sort((a, b) => {
        switch (this.currentRule) {
        case 'priceUp':
          return BigNumber.compared(a.closePrice, b.closePrice);
        case 'priceDown':
          return BigNumber.compared(b.closePrice, a.closePrice);
        case 'upDownUp':
          return BigNumber.compared(a.priceChangePercent, b.priceChangePercent);
        case 'upDownDown':
          return BigNumber.compared(b.priceChangePercent, a.priceChangePercent);
        case 'txNumUp':
          return BigNumber.compared(a.amount, b.amount);
        case 'txNumDown':
          return BigNumber.compared(b.amount, a.amount);
        default:
          return compareStr(a.tradeTokenSymbol, b.tradeTokenSymbol);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
