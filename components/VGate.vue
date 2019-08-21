<template>
  <div class="vgate">
    <div class="">
      <h1>
        {{$t('vgate.slogan')}}
      </h1>
      <div class="card-wrapper container">
          <div class="item" v-for="(item, index) in list" :key="index">
            <div class="is-flex token">
              <div class="token-left">
                <div class="operator-name">{{ item.key }} </div>
                <div class="operator-amount">
                  <div>成交量</div>
                  <div class="operator-value">{{ item.vxAmount }} VX</div>
                </div>
              </div>
              <div class="token-right">
                <img src="~/assets/images/index/vite.svg"/>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data(){
      return{
        list: [
          {
            key: 'xinsheng',
            logo: require('~/assets/images/operators/xinsheng.png'),
            vxAmount: 123,
            // logoActive: require('~/assets/images/operators/xinsheng-act.png'),
            url: 'https://forum.vite.net/topic/2313/introduction-of-vitex-operator-xsfund'
          },
          {
            key: 'bid',
            logo: require('~/assets/images/operators/bid.svg'),
            vxAmount: 123,
            // logoActive: require('~/assets/images/operators/bid-act.png'),
            url: 'https://www.bbiidd.org'
          },
          {
            key: 'vgate',
            logo: require('~/assets/images/operators/vgate.svg'),
            vxAmount: 123,
            // logoActive: require('~/assets/images/operators/vgate-act.png'),
            url: 'https://vgate.io/'
          },
        ]
      };
    },
    methods:{
      openVGate(){
        window.open(
          this.$i18n.locale === 'zh' ? 'https://forms.gle/eG66BnL3btbFNvH59' : 'https://forms.gle/eG66BnL3btbFNvH59'
        );
      },
      onHover (index) {
        this.hover = index;
      },
      onOut () {
        this.hover = null;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "assets/vars";
  .vgate{
    margin-top: 80px;
    background: url("~assets/images/bg/bg2.svg");
    padding: 60px 0 80px 0;
    h1 {
      margin-bottom: 40px;
      color: white;
      text-align: center;
    }
    .card-wrapper {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      @include mobile {
        flex-direction: column;
        padding: 0 20px;
      }
      .item {
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 9px 0px rgba(0,0,0,0.07);
        border-radius:5px;
        border:1px solid rgba(231,234,238,1);
        width: 255px;
        
        @include mobile {
          width: 100%;
          margin-bottom: 10px;
        }
      }
      
      .token {
        box-sizing: border-box;
        padding: 20px;
        padding-bottom: 18px;
        justify-content: space-between;
        .operator-name {
          font-size:20px;
          font-family:PingFangSC;
          font-weight:600;
          color:rgba(23,28,52,1);
          line-height:24px;
        }
        .operator-amount {
          font-size:12px;
          font-family:PingFangSC;
          font-weight:400;
          color:rgba(126,128,133,1);
          line-height:16px;
          margin-top: 10px;
          .operator-value {
            font-size:14px;
            color:rgba(84,86,90,1);
            line-height:18px;
            margin-top: 4px;
          }
        }
      }
    }
    
  }
</style>