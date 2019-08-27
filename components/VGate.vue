<template>
  <div class="vgate">
    <div class="">
      <div class="index-main-title">
        {{$t('operator.index.title')}}
      </div>
      <div class="card-wrapper container">
          <div class="item __pointer" v-for="(item, index) in showList" :key="index">
            <!-- <nuxt-link :to="`${locales}/operatorDetail/${item.address}`"> -->
              <div class="is-flex token" @click="gotoDetail(item.address)">
                <div class="token-left">
                  <div class="operator-name">{{ item.name }} </div>
                  <div class="operator-amount">
                    <div>{{$t('operator.index.amount')}}</div>
                    <div class="operator-value">123456 BTC</div>
                  </div>
                </div>
                <div class="token-right">
                  <img :src="item.icon" width="50px" height="50px"/>
                </div>
              </div>
            <!-- </nuxt-link> -->
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { operatorInfo } from '~/services/trade';
  export default {
    components: {},
    async beforeMount() {
      this.list = await operatorInfo([]);
    },
    computed: {
      locales() {
        return this.$i18n.locale === 'zh' ? 'zh' : '';
      },
      showList() {
        return this.list.map(item=> {
          return {
            ...item
          };
        });
      }
    },
    data(){
      return{
        list: []
      };
    },
    methods:{
      gotoDetail(address) {
        let locale = this.$i18n.locale !== 'en' ? `/${this.$i18n.locale}` : '';
        this.$router.path = locale;
        this.$router.push({path: `${locale}/operatorDetail/${address}`});
      },
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
          font-family:$font-family-light;
          font-weight:600;
          color:rgba(23,28,52,1);
          line-height:24px;
        }
        .operator-amount {
          font-size:12px;
          font-family:$font-family-light;
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