<template>
  <div class="datas container">
    <div class="index-main-title">{{ $t('indexPage.mine.title')}}</div>
    <div class="latest-update">{{ $t('indexPage.update') }} {{ getTime }}</div>
    <info-total-card :total-info="mineTotalInfo"></info-total-card>
    <div>
      <common-title :name="$t('indexPage.mine.tx.title')" :amount="totalMineAmount.tx"></common-title>
      <info-card :list="txMineList"></info-card>
    </div>
    <div>
      <common-title :name="$t('indexPage.mine.pledge.title')" :amount="totalMineAmount.pledge"></common-title>
      <pledge-card :pledge-amount="pledgeAmount"></pledge-card>
    </div>
    <div>
      <common-title :name="$t('indexPage.mine.order.title')" :amount="totalMineAmount.order"></common-title>
      <info-card :is-simple="true" :list="orderMineList"></info-card>
    </div>
    <div class="index-main-title">{{ $t('indexPage.dividend.title')}}</div>
    <div class="latest-update">{{ $t('indexPage.update') }} {{ getTime }}</div>
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
    dexFund.getCurrentDividendPools().then(data=> {
      this.dividendPools = data;
    }).catch(err=> {
      console.warn(err);
    });
    
    getMiningStat().then(data=> {
      this.dividendStat = data.userDividendStat;
    }).catch(err=> {
      console.warn(err);
      console.log('dividendStat error');
    });
    dexFund.getCurrentVxMineInfo().then(data=> {
      this.vxMineInfo = data;
    }).catch(err=> {
      console.warn(err);
      console.log('vxMineInfo error');
    });
    dexFund.getCurrentFeesForMine().then(data=> {
      // 1 VITE 2 ETH_001 3 BTC_001 4 USDT_001
      this.feesForMine = data;
    }).catch(err=> {
      console.warn(err);
      console.log('feesForMine error');
    });
    dexFund.getCurrentPledgeForVxSum().then(data=> {
      this.pledgeForVxSum = data;
    }).catch(err=> {
      console.warn(err);
      console.log('pledgeForVxSum error');
    });
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
    },
    '$store.state.exchangeRate.rateMap': function() {
      this.handleDividendPools();
    },
    '$store.state.exchangeRate.rateSymbolMap': function() {
      this.handleFeesForMine();
      this.handleDividendStat();
    }
  },
  computed: {
    getTime() {
      let date = new Date();
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    pledgeAmount() {
      return {
        vite: this.formatVX(this.pledgeForVxSum),
        btc: BigNumber.multi(this.formatVX(this.pledgeForVxSum) || 0, this.getRateFromSymbol('VITE', 'btc') || 0),
        percentAmount: this.vxMineInfo && (1000/this.formatVX(this.pledgeForVxSum) * this.formatVX(this.vxMineInfo.pledgeMine)).toFixed(2)
      };
    },
    mineTotalInfo() {
      return this.vxMineInfo && [{
        name: this.$t('indexPage.mine.todayTotal'),
        amount: `${this.formatVX(this.vxMineInfo.total)} VX`
      }, {
        name: this.$t('indexPage.mine.totalAmount'),
        amount: `${this.formatVX(this.vxMineInfo.historyMinedSum)} VX`
      }] || [];
    },
    diviTotalInfo() {
      return this.vxMineInfo && [{
        name: this.$t('indexPage.dividend.currentPool'),
        amount: `${this.allBtc} BTC`
      }, {
        name: this.$t('indexPage.dividend.totalPool'),
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
        fee: this.minePool['VITE'] &&  `${this.minePool['VITE'].fee} VITE` || '-- VITE',
        btcFee: this.minePool['VITE'] && this.minePool['VITE'].btcFee || '--',
        precentAmount: this.minePool['VITE'] && (1/this.minePool['VITE'].btcFee * this.formatVX(this.vxMineInfo.feeMineDetail['1'])).toFixed(2)
      }, {
        tokenSymbol: 'BTC',
        img: require('~/assets/images/index/btc.svg'),
        amount: `${this.formatVX(this.vxMineInfo.feeMineDetail['2'])} VX`,
        fee: this.minePool['BTC'] && `${this.minePool['BTC'].fee} BTC`|| '-- BTC',
        btcFee: this.minePool['BTC'] && this.minePool['BTC'].btcFee || '--',
        precentAmount: this.minePool['BTC'] && (1/this.minePool['BTC'].btcFee * this.formatVX(this.vxMineInfo.feeMineDetail['2'])).toFixed(2)
      }, {
        tokenSymbol: 'ETH',
        img: require('~/assets/images/index/eth.svg'),
        amount: `${this.formatVX(this.vxMineInfo.feeMineDetail['3'])} VX`,
        fee: this.minePool['ETH'] && `${this.minePool['ETH'].fee} ETH`|| '-- ETH',
        btcFee: this.minePool['ETH'] && this.minePool['ETH'].btcFee || '--',
        precentAmount: this.minePool['ETH'] && (1/this.minePool['ETH'].btcFee * this.formatVX(this.vxMineInfo.feeMineDetail['3'])).toFixed(2)
      }, {
        tokenSymbol: 'USDT',
        img: require('~/assets/images/index/usd.svg'),
        amount: `${this.formatVX(this.vxMineInfo.feeMineDetail['4'])} VX`,
        fee: this.minePool['USDT'] && `${this.minePool['USDT'].fee} USDT`|| '-- USDT',
        btcFee: this.minePool['USDT'] && this.minePool['USDT'].btcFee || '--',
        precentAmount: this.minePool['USDT'] && (1/this.minePool['USDT'].btcFee * this.formatVX(this.vxMineInfo.feeMineDetail['4'])).toFixed(2)
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
      let amount = 0;
      for (let key in this.pool) {
        amount = BigNumber.plus(this.pool[key].btcAmount, amount);
      }
      return amount;
    }
  },
  data() {
    return {
      vxMineInfo: null,
      feesForMine: null,
      pledgeForVxSum: null,
      dividendPools: null,
      dividendStat: null,
      pool: null,
      tokenList: ['VITE', 'ETH', 'BTC', 'USDT'],
      symbolRate: null,
      minePool: null,
      dividendAllPriceBtc: 0
    };
  },
  methods: {
    handleDividendPools() {
      let rawData =  Object.assign({}, this.dividendPools);

      if (!rawData) {
        this.pool = {};
        return;
      }

      this.pool = {};
      const tokenIds = [];

      for (const tokenId in rawData) {
        const token = rawData[tokenId];
        const tokenTypeName = this.tokenList[token.quoteTokenType - 1];

        this.pool[tokenTypeName] = this.pool[tokenTypeName] || {
          amount: '0',
          decimals: 8,
          btcAmount: '0'
        };

        let amount = BigNumber.toBasic(token.amount, token.tokenInfo.decimals);


        this.pool[tokenTypeName].amount = amount;
        this.pool[tokenTypeName].btcAmount = BigNumber.multi(amount || 0, this.getRate(token.tokenInfo.tokenId, 'btc') || 0);

        tokenIds.push(token.tokenInfo.tokenId);
      }
      this.$store.dispatch('addRateTokens', tokenIds);
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
        // let viteRate = this.getRateFromSymbol(tokenName, 'vite');
        let originAmount = this.feesForMine[tokenNum];
        let amount = BigNumber.toBasic(originAmount, decimals[tokenName]);

        this.minePool[tokenName] = this.minePool[tokenName] || {
          fee: '',
          btcFee: ''
        };
        this.minePool[tokenName].fee = amount; // parseInt(BigNumber.multi(amount || 0, viteRate || 0));
        this.minePool[tokenName].btcFee = BigNumber.multi(amount || 0, rate || 0);
      }
      
    },
    formatVX(num) {
      return BigNumber.originFormat(num, 18, 2);
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
.latest-update {
  text-align: center;
  font-size:14px;
  font-family:$font-family-light;
  font-weight:400;
  color:rgba(84,86,90,1);
  line-height:24px;
}
.index-main-title {
  color:rgba(23,28,52,1);
  padding-top: 60px;
  margin-bottom: 8px;
}

</style>



