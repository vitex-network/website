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

    <div class="index-main-title">{{ $t('indexPage.vite_destory.title')}}</div>
    <div class="latest-update">{{ $t('indexPage.update') }} {{ getTime }}</div>
    <info-total-card :total-info="viteDestoryInfo"></info-total-card>
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

const tokenNumMap = {
  'VITE': '1',
  'ETH': '2',
  'BTC': '3',
  'USDT': '4'
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
      this.vxMineInfo = data
      dexFund.getAllTotalVxBalance().then(data => {
        let period = 0
        let amount = ''
        data.funds.forEach(fund => {
          if (fund.period > period) {
            amount = fund.amount
            period = fund.period
          }
        })

        this.vxMineInfo = Object.assign({}, this.vxMineInfo, {
          lockAmount: amount
        })
      })
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
  created() {
    this.getTotalBurnedVITE();
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
        vite: this.formatVX(this.pledgeForVxSum) || '--',
        btc: BigNumber.multi(this.formatVX(this.pledgeForVxSum) || 0, this.getRateFromSymbol('VITE', 'btc') || 0) || '--', 
        percentAmount: this.vxMineInfo && (1000/this.formatVX(this.pledgeForVxSum) * this.formatVX(this.vxMineInfo.pledgeMine)).toFixed(4) || '--'
      };
    },
    mineTotalInfo() {
      return [{
        name: this.$t('indexPage.mine.todayTotal'),
        amount: `${this.vxMineInfo && this.formatVX(this.vxMineInfo.total) || '--'} VX`
      }, {
        name: this.$t('indexPage.mine.totalAmount'),
        amount: `${this.vxMineInfo && this.formatVX(this.vxMineInfo.historyMinedSum) || '--'} VX`
      }, {
        name: this.$t('indexPage.mine.lockAmount'),
        amount: `${this.vxMineInfo && this.formatVX(this.vxMineInfo.lockAmount) || '--'} VX`
      }];
    },
    diviTotalInfo() {
      return [{
        name: this.$t('indexPage.dividend.currentPool'),
        amount: `${this.allBtc || '--'} BTC`
      }, {
        name: this.$t('indexPage.dividend.totalPool'),
        amount: `${this.dividendAllPriceBtc || '--'} BTC`
      }];
    },
    viteDestoryInfo() {
      console.log('pool', JSON.stringify(this.pool))
      return [{
        name: this.$t('indexPage.vite_destory.todayAmount'),
        amount: `${(this.pool && this.pool.VITE && (1*this.pool.VITE.amount).toFixed(2)) || '--'} VITE`
      }, {
        name: this.$t('indexPage.vite_destory.destroyedAmount'),
        amount: `${(this.totalBurnedVITEAmount && (1*this.totalBurnedVITEAmount).toFixed(2)) || '--'} VITE`
      }]
    },
    totalMineAmount() {
      return {
        tx: `${this.vxMineInfo && this.formatVX(this.vxMineInfo.feeMineTotal) || '--'}`,
        pledge: `${this.vxMineInfo && this.formatVX(this.vxMineInfo.pledgeMine) || '--'}`,
        order: this.vxMineInfo && this.formatVX(this.vxMineInfo.makerMine) || '--'
      };
    },
    txMineList() {
      // tokenNumMap
      return this.tokenList.map(item=> {
        return {
          tokenSymbol: item,
          amount: `${this.vxMineInfo && this.formatVX(this.vxMineInfo.feeMineDetail[tokenNumMap[item]]) || '--'} VX`,
          fee: this.minePool && this.minePool[item] && (item !== 'VITE' ? `${this.minePool[item].fee} ${item}` : `${parseInt(this.minePool[item].fee)} ${item}`) || `-- ${item}`,
          btcFee: this.minePool && item !== 'BTC' && (this.minePool[item] && this.minePool[item].btcFee || '--'),
          precentAmount: this.minePool && this.vxMineInfo && this.minePool[item] && (this.minePool[item].btcFee / this.formatVX(this.vxMineInfo.feeMineDetail[tokenNumMap[item]]) * 1.25).toFixed(8)
        };
      });
    },
    orderMineList() {
      return this.tokenList.map((item, i)=> {
        return {
          tokenSymbol: item,
          amount: `${this.totalMineAmount && (this.totalMineAmount.order*this.percList[i]/100).toFixed(2) || '--'} VX`
        };
      });
    },
    dividendList() {
      if (this.pool) {
        return this.tokenDiviList.filter(x => x !== 'VITE').map(item=> {
          return {
            tokenSymbol: item,
            amount: this.pool && this.pool[item] && (item !== 'VITE' ? `${this.pool[item].amount} ${item}` : `${parseInt(this.pool[item].amount)} ${item}`),
            mainBtcAmount: item !== 'BTC' && this.pool && this.pool[item] && `${this.pool[item].btcAmount}`,
            amountPerVx: `${this.pool && this.pool[item] && this.vxMineInfo && (this.pool[item].amount * 10 / this.formatVX(this.vxMineInfo.lockAmount)).toFixed(8)} ${item}`
          };
        });
      } else {
        return this.tokenDiviList.filter(x => x !== 'VITE').map(item=> {
          return {
            tokenSymbol: item,
            amount: `-- ${item}`,
            mainBtcAmount: item !== 'BTC' && '--',
            amountPerVx: `-- ${item}`
          };
        });
      }
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
      tokenList: ['VITE', 'BTC', 'ETH', 'USDT'],
      percList: [15, 50, 15, 20],
      tokenDiviList: ['VITE', 'ETH', 'BTC', 'USDT'],
      symbolRate: null,
      minePool: null,
      dividendAllPriceBtc: 0,
      totalBurnedVITEAmount: 0,
    };
  },
  methods: {
    allMineBtcFee() {
      let amount = 0;
      for (let key in this.minePool) {
        amount = BigNumber.plus(this.minePool[key].btcFee, amount);
      }
      return amount;
    },
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
        const tokenTypeName = this.tokenDiviList[token.quoteTokenType - 1];

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
    },
    getTotalBurnedVITE() {
      fetch('https://vitex.vite.net/api/v1/mining/burn').then(res => res.json()).then(data => {
        this.totalBurnedVITEAmount = (data && data.data && data.data.vite && (1*data.data.vite).toFixed(8)) || 0
      })
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



