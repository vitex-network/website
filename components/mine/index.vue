<template>
  <div class="datas">
    <div class="title">VX当日挖矿概况</div>
    <info-total-card :total-info="mineTotalInfo"></info-total-card>
    <div>
      <common-title :name="`交易挖矿总收益`" :amount="totalMineAmount.tx"></common-title>
      <info-card :list="txMineList"></info-card>
    </div>
    <div>
      <common-title :name="`抵押挖矿总收益`" :amount="totalMineAmount.pledge"></common-title>
      <pledge-card :pledge-amount="pledgeAmount"></pledge-card>
    </div>
    <div>
      <common-title :name="`挂单挖矿总收益`" :amount="totalMineAmount.order"></common-title>
      <info-card :is-simple="true" :list="orderMineList"></info-card>
    </div>
    <div class="title">VX当日分红概况</div>
    <info-total-card :total-info="diviTotalInfo"></info-total-card>
    <info-card :is-simple="true" style="margin-top: 30px;" :list="dividendList"></info-card>
  </div>
</template>
<script>
import InfoCard from './InfoCard';
import InfoTotalCard from './InfoTotalCard';
import pledgeCard from './pledgeCard';
import { dexFund } from '~/utils/vitejs/index.js';
import BigNumber from '~/utils/bigNumber';
import commonTitle from './commonTitle';
import { getMiningStat } from '~/services/trade.js';
const tokenMap = {
  1: 'VITE',
  2: 'ETH',
  3: 'BTC',
  4: 'USDT'
};

const decimals = {
  'VITE': 18,
  'BTC': 8,
  'USDT': 6,
  'ETH': 18
};

export default {
  components: {
    InfoCard,
    InfoTotalCard,
    pledgeCard,
    commonTitle
  },
  async beforeCreate() {
    // VX 18位
    // 手续费相关的 VITE 18, ETH 18, BTC 8, USDT 6
    // 抵押是VITE 18位
    this.dividendPools = await dexFund.getCurrentDividendPools();

    Promise.all([getMiningStat().then(data=> {
      this.dividendStat = data.userDividendStat;
    }), dexFund.getCurrentVxMineInfo().then(data=> {
      this.vxMineInfo = data;
    }), dexFund.getCurrentFeesForMine().then(data=> {
      // 1 VITE 2 ETH_001 3 BTC_001 4 USDT_001
      this.feesForMine = data;
    }), dexFund.getCurrentPledgeForVxSum().then(data=> {
      this.pledgeForVxSum = data;
    })]);
    
  },
  watch: {
    dividendPools() {
      this.handleDividendPools();
    },
    feesForMine() {
      this.handleFeesForMine();
    },
    dividendStat() {
      this.handleDividendStat();
    }
  },
  computed: {
    pledgeAmount() {
      return {
        vite: this.formatVX(this.pledgeForVxSum),
        btc: BigNumber.multi(this.formatVX(this.pledgeForVxSum) || 0, this.getRateFromSymbol('VITE', 'btc') || 0)
      };
    },
    mineTotalInfo() {
      return this.vxMineInfo && [{
        name: '今日可挖量',
        amount: `${this.formatVX(this.vxMineInfo.total)} VX`
      }, {
        name: '累计挖矿总量',
        amount: `${this.formatVX(this.vxMineInfo.historyMinedSum)} VX`
      }] || [];
    },
    diviTotalInfo() {
      return this.vxMineInfo && [{
        name: '当前分红池',
        amount: `${this.allBtc} BTC`
      }, {
        name: '已发放分红总估值',
        amount: `${this.dividendAllPriceBtc} BTC`
      }] || [];
    },
    totalMineAmount() {
      return this.vxMineInfo && {
        tx: `${this.formatVX(this.vxMineInfo.feeMineTotal)}`,
        pledge: `${this.formatVX(this.vxMineInfo.pledgeMine)}`,
        order: this.formatVX(this.vxMineInfo.makerMine)
      } || {};
    },
    txMineList() {
      return this.vxMineInfo && this.minePool && [{
        tokenSymbol: 'VITE',
        img: require('~/assets/images/index/vite.svg'),
        amount: `${this.formatVX(this.vxMineInfo.feeMineDetail['1'])} VX`,
        fee: this.minePool['VITE'] && this.minePool['VITE'].fee || '--',
        btcFee: this.minePool['VITE'] && this.minePool['VITE'].btcFee || '--'
      }, {
        tokenSymbol: 'BTC',
        img: require('~/assets/images/index/btc.svg'),
        amount: `${this.formatVX(this.vxMineInfo.feeMineDetail['2'])} VX`,
        fee: this.minePool['BTC'] && this.minePool['BTC'].fee || '--',
        btcFee: this.minePool['BTC'] && this.minePool['BTC'].btcFee || '--'
      }, {
        tokenSymbol: 'ETH',
        img: require('~/assets/images/index/eth.svg'),
        amount: `${this.formatVX(this.vxMineInfo.feeMineDetail['3'])} VX`,
        fee: this.minePool['ETH'] && this.minePool['ETH'].btcFee || '--',
        btcFee: this.minePool['ETH'] && this.minePool['ETH'].btcFee || '--'
      }, {
        tokenSymbol: 'USDT',
        img: require('~/assets/images/index/usd.svg'),
        amount: `${this.formatVX(this.vxMineInfo.feeMineDetail['4'])} VX`,
        fee: this.minePool['USDT'] && this.minePool['USDT'].fee || '--',
        btcFee: this.minePool['USDT'] && this.minePool['USDT'].btcFee || '--'
      }] || [];
    },
    orderMineList() {
      return this.totalMineAmount && [{
        tokenSymbol: 'VITE',
        img: require('~/assets/images/index/vite.svg'),
        amount: `${(this.totalMineAmount.order/4).toFixed(2) } VX`
      }, {
        tokenSymbol: 'BTC',
        img: require('~/assets/images/index/btc.svg'),
        amount: `${(this.totalMineAmount.order/4).toFixed(2)} VX`
      }, {
        tokenSymbol: 'ETH',
        img: require('~/assets/images/index/eth.svg'),
        amount: `${(this.totalMineAmount.order/4).toFixed(2)} VX`
      }, {
        tokenSymbol: 'USDT',
        img: require('~/assets/images/index/usd.svg'),
        amount: `${(this.totalMineAmount.order/4).toFixed(2)} VX`
      }] || [];
    },
    dividendList() {
      return this.pool && [{
        tokenSymbol: 'VITE',
        img: require('~/assets/images/index/vite.svg'),
        amount: this.pool['VITE'] && `${this.pool['VITE'].amount} VITE` || '-- VITE',
        mainBtcAmount: this.pool['VITE'] && `${this.pool['VITE'].btcAmount}` || '--',
      }, {
        tokenSymbol: 'BTC',
        img: require('~/assets/images/index/btc.svg'),
        amount: this.pool['BTC'] && `${this.pool['BTC'].amount} BTC` || '-- BTC',
      }, {
        tokenSymbol: 'ETH',
        img: require('~/assets/images/index/eth.svg'),
        amount: this.pool['ETH'] && `${this.pool['ETH'].amount} ETH` || '-- ETH',
        mainBtcAmount: this.pool['ETH'] && `${this.pool['ETH'].btcAmount}` || '--',
      }, {
        tokenSymbol: 'USDT',
        img: require('~/assets/images/index/usd.svg'),
        amount: this.pool['USDT'] && `${this.pool['USDT'].amount} USDT` || '-- USDT',
        mainBtcAmount: this.pool['USDT'] && `${this.pool['USDT'].btcAmount}` || '--',
      }] || [];
    },
    allBtc() {
      let allPrice = this.getPrice(this.rawData, 'btc');
      if (+allPrice < 0) {
        return '--';
      }

      allPrice = this.formatNum(allPrice, 'BTC');
      return `${ allPrice }`;
    }
  },
  data() {
    return {
      vxMineInfo: null,
      feesForMine: null,
      pledgeForVxSum: null,
      dividendPools: null,
      dividendStat: null,
      rawData: {},
      pool: null,
      tokenList: ['VITE', 'ETH', 'BTC', 'USDT'],
      symbolRate: null,
      minePool: null,
      dividendAllPriceBtc: 0
    };
  },
  methods: {
    handleDividendPools() {
      this.rawData = this.dividendPools;
      if (!this.dividendPools) {
        this.pool = {};
        return;
      }
      this.pool = {};
      const tokenIds = [];

      for (const tokenId in this.dividendPools) {
        const token = this.dividendPools[tokenId];
        const tokenTypeName = this.tokenList[token.quoteTokenType - 1];

        this.pool[tokenTypeName] = this.pool[tokenTypeName] || {
          amount: '0',
          decimals: 8,
          tokens: []
        };

        const allAmount = this.pool[tokenTypeName].amount;

        token.tokenType = tokenTypeName;
        token.amount = BigNumber.toBasic(token.amount, token.tokenInfo.decimals);

        this.pool[tokenTypeName].tokens.push(token);
        this.pool[tokenTypeName].amount = BigNumber.plus(token.amount, allAmount);
        this.pool[tokenTypeName].btcAmount = BigNumber.multi(token.amount || 0, this.getRate(token.tokenInfo.tokenId, 'btc') || 0);
        tokenIds.push(token.tokenInfo.tokenId);

        this.$store.dispatch('addRateTokens', tokenIds);
      }
    },
    handleDividendStat() {
      let allPrice = 0;
      for (const tokenName in this.dividendStat) {
        let rate = this.getRateFromSymbol(tokenName, 'btc');
        let originAmount = this.dividendStat[tokenName].dividendAmount;
        let btcAmount = BigNumber.multi(originAmount || 0, rate || 0);
        allPrice = BigNumber.plus(btcAmount, allPrice);
      }
      this.dividendAllPriceBtc = allPrice;
    },
    handleFeesForMine() {
      this.minePool = {};
      for (const tokenNum in this.feesForMine) {
        let tokenName = tokenMap[tokenNum];
        let rate = this.getRateFromSymbol(tokenName, 'btc');
        let viteRate = this.getRateFromSymbol(tokenName, 'vite');
        let originAmount = this.feesForMine[tokenNum];
        let amount = BigNumber.toBasic(originAmount, decimals[tokenName]);

        this.minePool[tokenName] = this.minePool[tokenName] || {
          fee: '',
          btcFee: ''
        };
        this.minePool[tokenName].fee = BigNumber.multi(amount || 0, viteRate || 0);
        this.minePool[tokenName].btcFee = BigNumber.multi(amount || 0, rate || 0);
      }
    },
    formatVX(num) {
      return BigNumber.originFormat(num, 18, 2);
    },
    formatNum(amount, tokenSymbol) {
      const map = {
        BTC: 8,
        ETH: 8,
        VITE: 4,
        USDT: 2
      };
      return BigNumber.formatNum(amount, map[tokenSymbol]);
    },
    getPrice(data, coin) {
      let allPrice = 0;
      for (const tokenId in data) {
        const token = data[tokenId];
        if (!token.amount) {
          continue;
        }

        const rate = this.getRate(tokenId, coin);
        if (!rate) {
          return -1;
        }

        const price = BigNumber.multi(token.amount || 0, rate || 0);
        allPrice = BigNumber.plus(price, allPrice);
      }
      return allPrice;
    },
    getRate(tokenId, coin) {
      const rateList = this.$store.state.exchangeRate.rateMap || {};
      if (!tokenId || !rateList[tokenId]) {
        return null;
      }

      return rateList[tokenId][`${ coin }Rate`] || null;
    },
    getRateFromSymbol(symbol, coin) {
      const rateList = this.$store.state.exchangeRate.rateSymbolMap || {};
      if (!symbol || !rateList[symbol]) {
        return null;
      }
      this.symbolRate = rateList[symbol][`${ coin }Rate`] || null;

      return this.symbolRate;
    }
  }
  
};
</script>
<style lang="scss" scoped>
@import "~assets/vars.scss";
.datas {
  @include mobile {
    padding: 0 20px;
  }
  
}
  .title {
    text-align: center;
    margin-top: 60px;
    font-size:32px;
    font-family:PingFangSC;
    font-weight:600;
    color:rgba(23,28,52,1);
    line-height:45px;
  }
</style>



