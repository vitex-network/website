<template>
  <div class="landing-dashbord">
    <div class="col">
      <div class="market-col __col-content">
        <div class="header-info">
          <div>
            <a href="https://coinmarketcap.com/exchanges/vitex/" target="_blank"><img src="~/assets/images/index/cmc.png" alt="" /></a>
            <a href="https://www.coingecko.com/en/exchanges/vitex" target="_blank"><img src="~/assets/images/index/cg.png" alt="" /></a>
          </div>
        </div>
        <div class="market-wrapper">
          <div class="market-item header">
            <div>{{ $t("marketTable.header.txPair") }}</div>
            <div>{{ $t("marketTable.header.closePrice") }}</div>
            <div>{{ $t("marketTable.header.change") }}</div>
          </div>
          <a
            class="market-item"
            v-for="item in markets"
            :key="item.symbol"
            :href="`https://x.vite.net/trade?symbol=${item.symbol}`"
            target="_blank"
          >
            <div>{{ item.symbol | formatTradeSymbol}}</div>
            <div>
              <strong>{{ item.closePrice }}</strong> {{ item.quoteTokenSymbol }}
            </div>
            <div
              class="item-percent"
              :class="{
                'is-up': Number(item.priceChangePercent) > 0,
                'is-down': Number(item.priceChangePercent) < 0,
              }"
            >
              <strong>{{ item.priceChangePercent | percent }}</strong>
            </div>
          </a>
        </div>

        <a
          href="https://x.vite.net/trade"
          class="__footer"
          target="_blank"
          key="another"
        >
          {{ $t("indexPage.landingDashbord.more") }}
        </a>
      </div>
    </div>
    <div class="col">
      <div class="reward-col __col-content">
        <h2>{{ $t("indexPage.landingDashbord.apy", { apy: vxApy }) }}</h2>
        <div class="sub-title">
          <div>
            {{
              $t("indexPage.landingDashbord.vxStakingAmount", {
                amount: mineInfo.lockAmount,
              })
            }}
          </div>
          <div>
            {{
              $t("indexPage.landingDashbord.vxStakingRatio", {
                ratio: mineInfo.lockRatio,
              })
            }}
          </div>
        </div>
        <div class="chart-wrapper">
          <div class="chart-header">
            <div>{{ $t("indexPage.landingDashbord.emissionChart") }}</div>
            <div>
              {{
                $t("indexPage.landingDashbord.marketCap", { cap: vxMarketCap })
              }}
            </div>
          </div>
          <emission-chart></emission-chart>
        </div>
        <div class="divided-cal">
          <h4>{{ $t("indexPage.landingDashbord.dividedCal") }}</h4>
          <divided-cal></divided-cal>
        </div>

        <nuxt-link :to="localePath('mine')" class="__footer">{{
          $t("indexPage.landingDashbord.aboutMining")
        }}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import numeral from "numeral";
import DividedCal from "./dividedCal.vue";
import EmissionChart from "./emissionChart.vue";

export default {
  components: {
    DividedCal,
    EmissionChart,
  },
  computed: {
    markets() {
      return this.$store.state.exchangeMarket.landingMarkets;
    },
    mineInfo() {
      return this.$store.getters.mineInfo;
    },
    vxApy() {
      return numeral(Number(this.$store.getters.vxApy)).format("0 %");
    },
    vxMarketCap() {
      return this.$store.getters.vxMarketCap;
    },
  },
};
</script>

<style lang="scss" scoped>
$landing-border-radius: 5px;

@import "assets/vars";

.landing-dashbord {
  display: flex;
  flex-direction: row;
  position: absolute;
  width: 100%;
  margin-top: -150px;
  @include until($desktop) {
    flex-direction: column;
    position: relative;
    margin-top: -60px;
  }
}
.col {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 15px;
  .__col-content {
    box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.07);
    height: 100%;
    position: relative;
    padding-bottom: 60px;
    @include until($desktop) {
      margin: 0 -15px;
    }
    .__footer {
      height: 60px;
      font-size: 14px;
      align-items: center;
      color: #2f5bea;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-weight: 600;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: white;
      border-bottom-left-radius: $landing-border-radius;
      border-bottom-right-radius: $landing-border-radius;
    }
  }
}

.market-col {
  position: relative;
  border-bottom-left-radius: $landing-border-radius;
  border-bottom-right-radius: $landing-border-radius;
  margin-left: -15px;
  .market-item {
    display: flex;
    flex-direction: row;
    padding-left: 12px;
    padding-right: 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    height: 60px;
    font-size: 14px;
    align-items: center;
    justify-content: space-between;
    color: #54565a;
    background-color: white;
    &:last-child {
      border-bottom: none;
      border-bottom-right-radius: $landing-border-radius;
      border-bottom-left-radius: $landing-border-radius;
      justify-content: center;
    }
    & > div {
      &:nth-child(1) {
        width: 40%;
      }
      &:nth-child(2) {
        width: 40%;
      }
      &:nth-child(3) {
        width: 110px;
      }
    }
    &.header {
      color: #7e8085;
      font-size: 12px;
      border-top-right-radius: $landing-border-radius;
    }
    .is-up {
      strong {
        color: #00d764;
      }
    }
    .is-down {
      strong {
        color: red;
      }
    }
    strong {
      font-weight: 600;
    }
  }
  .header-info {
    height: 30px;
    width: 100%;
    display: flex;
    flex-direction: row;
    position: absolute;
    top: -30px;
    & > div {
      background-color: white;
      padding: 7px 12px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    img {
      height: 16px;
    }
  }

  .__footer {
      border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
}

.reward-col {
  background-color: white;
  border-radius: $landing-border-radius;
  padding: 20px;
  margin-right: -15px;
  h2 {
    font-size: 28px;
    font-weight: 600;
    text-align: left;
    color: #171c34;
    line-height: 32px;
  }
  .sub-title {
    font-size: 14px;
    font-weight: 400;
    color: #54565a;
    margin-top: 7px;
    flex-direction: row;
    display: flex;
    justify-content: space-between;
  }
  .chart-wrapper {
    width: 100%;
    margin: 20px 0;
    .chart-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 600;
      margin: 12px 0;
    }
  }
  .divided-cal {
    h4 {
      font-size: 14px;
      font-weight: 600;
      color: #54565a;
      margin: 12px 0;
    }
  }
}
</style>