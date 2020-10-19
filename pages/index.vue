<template>
  <div>
    <section class="hero home">
      <div class="hero-body">
        <div class="container">
          <div class="is-size-1-desktop is-size-2-touch slogan-wrapper">
            <h1>{{$t("home.slogan")}}</h1>
            <h1>{{$t("home.content")}}</h1>
          </div>
          <div class="btn">
            <a class="start-btn" :href="$t('home.guideUrl')">{{$t('home.guide')}}</a>
            <div class="start-btn" @click="openViteX">{{$t('home.starttoUse')}}</div>
          </div>
        </div>
      </div>
    </section>
    <div class="landing-dashbord-wrapper">
      <div class="container">
        <landing-dashbord></landing-dashbord>        
      </div>
    </div>
    <div class="mine-wrapper">
      <mine></mine>
    </div>
    <!-- <use-vitex></use-vitex> -->
    <v-gate></v-gate>
    <div class="market-wrapper">
      <market class="container"></market>
    </div>
    <vitex-info></vitex-info>

    <!-- <binance-vote /> -->
  </div>
</template>

<script>
import VitexInfo from "~/components/VitexInfo";
import UseVitex from "~/components/UseVitex";
import VGate from "~/components/VGate";
import Slider from "~/components/Slider";
import LandingDashbord from '~/components/LandingDashbord';
import { urls } from "~/config.js";
import mine from "~/components/mine/index";
import market from "~/components/market/market.vue";
// import BinanceVote from '~/components/BinanceVote/index.vue'

export default {
  components: {
    VitexInfo,
    UseVitex,
    VGate,
    Slider,
    mine,
    market,
    LandingDashbord
    // BinanceVote
  },
  beforeMount() {
    this.$store.dispatch("startLoopExchangeRate");
    this.$store.dispatch("startLoopRateBySymbol");
    this.$store.dispatch("getLandingMarkets");


    this.$store.dispatch("getTotalVxSupply");
    this.$store.dispatch("getDividendInfo");
    this.$store.dispatch("getMineInfo");
  },
  methods: {
    openViteX() {
      window.open(urls.vitex[this.$i18n.locale]);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "assets/vars.scss";
.landing-dashbord-wrapper {
  background: #f6f8f9;
  padding-bottom: 30px;
  min-height: 200px;
}
.mine-wrapper {
  background: #f6f8f9;
  padding-bottom: 80px;
  padding-top: 150px;
  @include touch {
    padding-top: 32px;
    padding-bottom: 30px;
  }
}
.market-wrapper {
  padding: 60px 0 88px 0;
  background-color: #131c34;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  color: #111111;
  font-family: $font-family-light;
  font-weight: normal;
  margin-bottom: 3rem;
}
.slider {
  position: absolute;
  top: -150px;
  width: 100%;
  @include touch {
    top: -50px;
  }
}
.home {
  position: relative;
  font-family: $font-family-title;
  .hero-body {
    padding: 0 10px 205px 10px;
  }
  @include touch {
    .hero-body {
      display: block;
      padding-bottom: 127px;
    }
  }

  .slogan-wrapper {
    margin-top: 14%;
    padding-bottom: 40px;
    text-align: center;
    h1 {
      font-size: 32px;
    }
    @include touch {
      max-width: unset;
      h1 {
        font-size: 28px;
      }
    }
    @include mobile {
      margin-top: 0;
      h1 {
        font-size: 28px;
      }
    }
  }
}

.btn {
  margin: 0 auto;
  max-width: 400px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .start-btn {
    flex-shrink: 0;
    display: block;
    width: 170px;
    line-height: 53px;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    background: $common-active-color;
    cursor: pointer;
    @include touch {
      height: 44px;
      line-height: 42px;
    }
  }
}

@media screen and (max-width: 321px) {
  .btn {
    justify-content: center;
  }
  .start-btn + .start-btn {
    margin-top: 16px;
  }
}
</style>