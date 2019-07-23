<template>
  <div class="vgate">
    <div class="container">
      <div class="is-size-1-desktop is-size-2-touch slogan-wrapper">
        <h1>
          {{$t('vgate.slogan')}}
        </h1>
      </div>
      <div class="operators columns is-multiline is-mobile is-centered">
        <div :key="item.key" v-for="(item, index) in list" class="item">
          <a :href="item.url" target="_blank" @mouseover="onHover(index)" @mouseout="onOut(index)" :class="`key-${item.key}`">
            <div class="img-wrapper">
              <!--<img v-show="index === hover" class="investor-logo" :src="item.logoActive" alt="">-->
              <img :src="item.logo" alt="">
            </div>
          </a>
        </div>
      </div>
      <div class="btn">
        <div
            class="gate-btn"
            @click="openVGate"
        >{{$t('vgate.btn')}}
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
            // logoActive: require('~/assets/images/operators/xinsheng-act.png'),
            url: 'https://forum.vite.net/category/55/xsfund'
          },
          {
            key: 'bid',
            logo: require('~/assets/images/operators/bid.svg'),
            // logoActive: require('~/assets/images/operators/bid-act.png'),
            url: 'https://www.bbiidd.org'
          },
          {
            key: 'vgate',
            logo: require('~/assets/images/operators/vgate.svg'),
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
    display: flex;
    height: 360px;
    align-items: center;
    justify-content: center;
    background: url("~assets/images/bg/bg2.svg");
    .container{
      height: 100%;
    }
    @include touch {
      height: 220px;
    }
    .is-multiline {
      display: flex;
      display: -webkit-flex;
      flex-wrap: wrap;
      .item{
        padding: 0 60px;
      }
    }
    .slogan-wrapper {
      padding: 40px 0 45px 0;
      text-align: center;
      h1 {
        font-size: 32px;
        color: #ffffff;
        @include touch {
          font-size: 24px;
        }
      }
      p {
        margin-top: 30px;
        font-size: 14px;
        color: $common-text-color;
        line-height: 24px;
        font-family: $font-family-light;
        @include touch {
          font-size: 1rem;
        }
      }
    }
    .btn{
      text-align: center;
      .gate-btn {
        display: inline-block;
        width: 180px;
        height: 55px;
        margin-top: 30px;
        line-height: 53px;
        border-radius: 5px;
        color: $common-active-color;
        font-size: 16px;
        font-family: $font-family-title;
        background: white;
        cursor: pointer;
        @include touch {
          height: 44px;
          line-height: 42px;
          font-size: 16px;
        }
      }
    }
  }
</style>