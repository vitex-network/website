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
import { getMiningStat, getBurnedVite } from '~/services/trade.js';
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

const decimalsDisplay = {
  'VITE': 2,
  'BTC': 8,
  'USDT': 6,
  'ETH': 8
};

export default {
  components: {
    InfoCard,
    InfoTotalCard,
    pledgeCard,
    commonTitle
  },
  computed: {
    getTime() {
      let date = new Date();
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    pledgeAmount() {
      return this.$store.getters.pledgeForVx;
    },
    mineInfo() {
      return this.$store.getters.mineInfo;
    },
    dividendPoolsInBTCSum() {
      return this.$store.getters.dividendPoolsInBTCSum;
    },
    dividendAllPriceBtc() {
      return this.$store.getters.dividendAllPriceBtc;
    },
    mineTotalInfo() {
      const mineInfo = this.mineInfo;
      return [{
        name: this.$t('indexPage.mine.todayTotal'),
        amount: mineInfo.total + ' VX'
      }, {
        name: this.$t('indexPage.mine.totalAmount'),
        amount: mineInfo.historyMinedSum + ' VX',
        ratio: this.$t('indexPage.mine.minedRatio', { ratio : `${ mineInfo.minedRatio || '--'} %` })
      }, {
        name: this.$t('indexPage.mine.lockAmount'),
        amount: mineInfo.lockAmount + ' VX',
        ratio: this.$t('indexPage.mine.lockRatio', { ratio : `${ mineInfo.lockRatio || '--'} %` })
      }];
    },
    diviTotalInfo() {
      return [{
        name: this.$t('indexPage.dividend.currentPool'),
        amount: `${ this.dividendPoolsInBTCSum || '--' } BTC`
      }, {
        name: this.$t('indexPage.dividend.totalPool'),
        amount: `${ this.dividendAllPriceBtc || '--' } BTC`
      }];
    },
    viteDestoryInfo() {
      const { viteDestoryInfo } = this.$store.getters;
      return [{
        name: this.$t('indexPage.vite_destory.todayAmount'),
        amount: `${ viteDestoryInfo.today || '--'} VITE`
      }, {
        name: this.$t('indexPage.vite_destory.destroyedAmount'),
        amount: `${ viteDestoryInfo.total || '--'} VITE`
      }]
    },
    totalMineAmount() {
      return {
        tx: `${this.mineInfo && this.formatVX(this.mineInfo.feeMineTotal) || '--'}`,
        pledge: `${this.mineInfo && this.formatVX(this.mineInfo.pledgeMine) || '--'}`,
        order: this.mineInfo && this.formatVX(this.mineInfo.makerMine) || '--'
      };
    },
    minePools() {
      return this.$store.getters.minePools;
    },
    dividendPools() {
      return this.$store.getters.dividendPools;
    },
    txMineList() {
      // tokenNumMap
      return this.tokenList.map(item=> {
        return {
          tokenSymbol: item,
          title: item,
          amount: `${ this.mineInfo.feeMineDetail && this.formatVX(this.mineInfo.feeMineDetail[tokenNumMap[item]]) || '--'} VX`,
          fee: this.minePools[item] && (`${BigNumber.normalFormatNum(this.minePools[item].fee, decimalsDisplay[item])} ${item}`) || `-- ${item}`,
          btcFee: item !== 'BTC' && (this.minePools[item] && this.minePools[item].btcFee || '--'),
          precentAmount: this.minePools[item] && this.mineInfo.feeMineDetail && (this.minePools[item].btcFee / this.formatVX(this.mineInfo.feeMineDetail[tokenNumMap[item]]) * 1.25).toFixed(8)
        };
      });
    },
    orderMineList() {
      return this.tokenList.map((item, i)=> {
        return {
          tokenSymbol: item,
          title: item,
          amount: `${this.totalMineAmount && (this.totalMineAmount.order*this.percList[i]/100).toFixed(2) || '--'} VX`
        };
      });
    },
    dividendList() {
      if (Object.keys(this.dividendPools).length) {
        return this.tokenDiviList.filter(x => x !== 'VITE').map(item=> {
          return {
            tokenSymbol: item,
            title: this.$t('indexPage.dividend.subPool', { symbol : item }),
            amount: this.dividendPools[item] && `${this.dividendPools[item].amount} ${item}`,
            mainBtcAmount: item !== 'BTC' && this.dividendPools[item] && `${this.dividendPools[item].btcAmount}`,
            amountPerVx: this.dividendPools[item] && (`${BigNumber.multi(this.dividendPools[item].amountPerVx, 1000, decimalsDisplay[item]) || '--'} ${item}`)
          };
        });
      } else {
        return this.tokenDiviList.filter(x => x !== 'VITE').map(item=> {
          return {
            tokenSymbol: item,
            title: this.$t('indexPage.dividend.subPool', { symbol : item }),
            amount: `-- ${item}`,
            mainBtcAmount: item !== 'BTC' && '--',
            amountPerVx: `-- ${item}`
          };
        });
      }
    },
  },
  data() {
    return {
      vxMineInfo: null,
      feesForMine: null,
      pledgeForVxSum: null,
      // dividendPools: null,
      pool: null,
      tokenList: ['VITE', 'BTC', 'ETH', 'USDT'],
      percList: [15, 50, 15, 20],
      tokenDiviList: ['VITE', 'ETH', 'BTC', 'USDT'],
      symbolRate: null,
      minePool: null,
      // dividendAllPriceBtc: 0,
      totalBurnedVITEAmount: 0,
      vxTotalSupply: 0
    };
  },
  methods: {
    formatVX(num) {
      return BigNumber.originFormat(num, 18, 2);
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



