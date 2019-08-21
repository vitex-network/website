<template>
    <div class="tx-pair-wrapper">
        <span v-show="symbol && realPrice" class="real-price" :style="`top: ${top}px`">{{ realPrice }}</span>
        <div ref="txList" class="tx-list">
            <div :ref="`txPair${i}`" v-for="(txPair, i) in showList" :key="i"
                 class="__center-tb-row __pointer"
                 @mouseenter="showRealPrice(txPair, i)"
                 @mouseleave="hideRealPrice(txPair)">
                <span class="__center-tb-item">
                    <span>{{ getTxPairShowSymbol(txPair) }}</span>
                </span>
                <span class="__center-tb-item">
                    {{ txPair.closePrice ? formatNum(txPair.closePrice, txPair.pricePrecision) : '--' }}
                </span>
                <span  class="__center-tb-item percent" :class="{
                    'up': +txPair.priceChange > 0,
                    'down': +txPair.priceChange < 0
                }">{{ txPair.priceChangePercent ? getPercent(txPair.priceChangePercent) : '--' }}</span>
                <span  class="__center-tb-item">
                    {{ txPair.amount ? formatNum(txPair.amount, 1) : '--' }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import BigNumber from '~/utils/bigNumber';

export default {
  props: {
    currentRule: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      symbol: null,
      realPrice: '',
      top: 0
    };
  },
  computed: {
    showList() {
      const list = this.orderList(this.list);
      return list;
    }
  },
  methods: {
    getTxPairShowSymbol(txPair) {
      const tradeTokenSymbol = txPair.tradeTokenSymbol.split('-')[0];
      const quoteTokenSymbol = txPair.quoteTokenSymbol.split('-')[0];
      return `${ tradeTokenSymbol }/${ quoteTokenSymbol }`;
    },
    getPercent(num) {
      return `${ BigNumber.multi(num, 100, 2) }%`;
    },
    formatNum(num, fix) {
      return BigNumber.formatNum(num, fix);
    },
    showRealPrice(txPair, i) {
      const elTop = this.$refs[`txPair${ i }`][0].getBoundingClientRect().top;
      const listTop = this.$refs.txList.getBoundingClientRect().top;
      const height = this.$refs.txList.clientHeight;
      const top = elTop - listTop;

      if (top > listTop + height) {
        this.hideRealPrice();
        return;
      }

      this.top = top;
      this.symbol = txPair.symbol;
      this.realPrice = this.getRealPrice(txPair);
    },
    hideRealPrice(txPair) {
      if (this.symbol && txPair.symbol === this.symbol) {
        this.symbol = null;
      }
    },
    getRealPrice(txPair) {
      if (!txPair) {
        return txPair.tradeTokenSymbol;
      }

      const rate = this.getRate(txPair.quoteToken);
      if (!rate) {
        return txPair.tradeTokenSymbol;
      }

      const price = BigNumber.multi(txPair.closePrice || 0, rate || 0, 2);
      if (!+price) {
        return txPair.tradeTokenSymbol;
      }

      const pre = this.$i18n.locale === 'zh' ? '≈¥': '≈$';
      return `${ txPair.tradeTokenSymbol }  ${ pre }${ price }`;
    },
    getRate(tokenId) {
      const rateList = this.$store.state.exchangeRate.rateMap || {};
      const coin = this.$i18n.locale === 'zh' ? 'cny': 'usd';

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
@import "./center.scss";

.tx-pair-wrapper {
    position: relative;
    flex: 1;
    display: flex;
    height: 1px;

    .real-price {
        position: absolute;
        padding: 8px;
        right: -10px;
        z-index: 1;
        transform: translateX(100%);
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);
        font-size: 12px;
        color: #5E6875;
        font-family: $font-normal, arial, sans-serif;
        font-weight: 400;

        &::after {
            content: ' ';
            border: 5px solid transparent;
            border-right: 5px solid #fff;
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: -5px;
            margin-left: -10px;
        }
    }

    .tx-list {
        flex: 1;
        overflow: auto;
    }
}

.__center-tb-row {
    .__center-tb-item {
        position: relative;
    }

    .describe {
        display: inline-block;
        width: 80px;
    }

    &.active {
        background: rgba(75, 116, 255, 0.1);
    }
}

</style>
