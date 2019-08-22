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
    this.vxMineInfo = await dexFund.getCurrentVxMineInfo();
    this.feesForMine = await dexFund.getCurrentFeesForMine();
    this.pledgeForVxSum = await dexFund.getCurrentPledgeForVxSum();
  },
  computed: {
    pledgeAmount() {
      return `${this.formatVX(this.pledgeForVxSum)}`;
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
        amount: `${this.formatVX(this.vxMineInfo.total)} BTC`
      }, {
        name: '已发放分红总估值',
        amount: `${this.formatVX(this.vxMineInfo.historyMinedSum)} BTC`
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
      return this.vxMineInfo && [{
        tokenSymbol: 'VITE',
        img: require('~/assets/images/index/vite.svg'),
        amount: `${this.formatVX(this.vxMineInfo.feeMineDetail['1'])} VX`
      }, {
        tokenSymbol: 'BTC',
        img: require('~/assets/images/index/btc.svg'),
        amount: `${this.formatVX(this.vxMineInfo.feeMineDetail['2'])} VX`
      }, {
        tokenSymbol: 'ETH',
        img: require('~/assets/images/index/eth.svg'),
        amount: `${this.formatVX(this.vxMineInfo.feeMineDetail['3'])} VX`
      }, {
        tokenSymbol: 'USDT',
        img: require('~/assets/images/index/usd.svg'),
        amount: `${this.formatVX(this.vxMineInfo.feeMineDetail['4'])} VX`
      }] || [];
    },
    orderMineList() {
      return this.vxMineInfo && [{
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
      return this.vxMineInfo && [{
        tokenSymbol: 'VITE',
        img: require('~/assets/images/index/vite.svg'),
        amount: `${(this.totalMineAmount.order/4).toFixed(2) } VITE`,
        mainBtcAmount: '--'
      }, {
        tokenSymbol: 'BTC',
        img: require('~/assets/images/index/btc.svg'),
        amount: `${(this.totalMineAmount.order/4).toFixed(2)} BTC`
      }, {
        tokenSymbol: 'ETH',
        img: require('~/assets/images/index/eth.svg'),
        amount: `${(this.totalMineAmount.order/4).toFixed(2)} ETH`,
        mainBtcAmount: '--'
      }, {
        tokenSymbol: 'USDT',
        img: require('~/assets/images/index/usd.svg'),
        amount: `${(this.totalMineAmount.order/4).toFixed(2)} USDT`,
        mainBtcAmount: '--'
      }] || [];
    }
  },
  data() {
    return {
      vxMineInfo: null,
      feesForMine: null,
      pledgeForVxSum: null,
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



