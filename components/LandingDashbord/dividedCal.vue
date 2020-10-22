<template>
  <div>
    <div class="staking-time">
      <div>{{ $t("indexPage.landingDashbord.stakingTime") }}</div>
      <div>
        <span
          v-for="(item, index) in timeList"
          :key="item"
          style="cursor: pointer"
          @click="onTimeSelected(item)"
        >
          <span :class="{ 'selected-time': item === selectedTime }">{{
            $t(`indexPage.landingDashbord.time.${item}`)
          }}</span>
          <span v-if="index < timeList.length - 1">/</span>
        </span>
      </div>
    </div>
    <div class="reward-cal">
      <div class="col">
        <div class="header">
          {{ $t("indexPage.landingDashbord.vxStakingAmountInput") }}
        </div>
        <div class="input-wrapper">
          <input type="text" v-model="amount" />
        </div>
        <div class="reward-footer">
          {{ $t("indexPage.landingDashbord.curValue", { curValue }) }}
        </div>
      </div>
      <div class="col">
        <img src="~assets/images/arrow.svg" alt="" />
      </div>
      <div class="col">
        <div class="header">
          {{ $t("indexPage.landingDashbord.reardInYear", { time: time }) }}
        </div>
        <div class="reward-detail">
          <div v-for="item in rewardList" :key="item.name">
            <img :src="item.logo" alt="" />
            <div>{{ item.amount }}</div>
            <div style="margin-left: 5px">{{ item.name }}</div>
          </div>
        </div>
        <div class="reward-footer">
          {{ $t("indexPage.landingDashbord.rewardValue", { rewardValue: total }) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bigNumber from "~/utils/bigNumber";

const logoMaps = {
  VITE: require("~/assets/images/index/vite.svg"),
  BTC: require("~/assets/images/index/btc.svg"),
  ETH: require("~/assets/images/index/eth.svg"),
  USDT: require("~/assets/images/index/usd.svg"),
};

const timeMaps = {
  year: 365,
  halfYear: 180,
  month: 30,
  week: 7,
  day: 1,
};

export default {
  data() {
    return {
      amount: 10000,
      selectedTime: "year",
      timeList: ["year", "halfYear", "month", "week", "day"],
    };
  },
  computed: {
    time() {
      return timeMaps[this.selectedTime];
    },
    dividendPools() {
      return this.$store.getters.dividendPools;
    },
    rewardList() {
      return Object.keys(this.dividendPools)
        .filter((key) => key !== "VITE")
        .map((key) => {
          return {
            ...this.dividendPools[key],
            name: key,
            amount: bigNumber.multi(
              bigNumber.multi(this.amount, this.dividendPools[key].amountPerVx),
              this.time
            ),
            logo: logoMaps[key],
            value: {
              cny: bigNumber.multi(
                this.amount,
                this.dividendPools[key].valuePerVx.cny
              ),
              usd: bigNumber.multi(
                this.amount,
                this.dividendPools[key].valuePerVx.usd
              ),
            },
          };
        });
    },
    total() {
      let total = this.rewardList.reduce(
        (pre, cur) => bigNumber.plus(pre, cur.value[this.targetCurrency === '¥' ? 'cny' : 'usd']),
        0
      );
      return `${this.targetCurrency} ${bigNumber.multi(
        total,
        this.time,
        2
      )}`;
    },
    targetCurrency() {
      return this.$i18n.locale === "zh" ? "¥" : "$";
    },
    vxPrice() {
      return this.$store.getters.vxPrice;
    },
    curValue() {
      let price =
        this.$i18n.locale === "zh" ? this.vxPrice.cny : this.vxPrice.usd;
      if (price) {
        return this.targetCurrency + " " + bigNumber.multi(price, this.amount, 2);
      }
      return "--";
    },
  },
  methods: {
    onTimeSelected(time) {
      this.selectedTime = time;
    },
  },
};
</script>

<style lang="scss" scoped>
.staking-time {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  .selected-time {
    color: #2f5bea;
  }
}

.reward-cal {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fbfcff;
  padding: 20px;
  border: 1px solid #e7eaee;
  border-radius: 2px;
  font-size: 12px;
  .col {
    border: 1px solid #e7eaee;
    background: #f4f7fa;
    position: relative;
    &:nth-child(1),
    &:nth-child(3) {
      flex: 10;
    }
    &:nth-child(2) {
      flex: 3;
      flex-direction: row;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
    }
    .header {
      height: 28px;
      background-color: white;
      padding: 0 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .reward-footer {
      position: absolute;
      bottom: -20px;
    }
    .input-wrapper {
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      input {
        display: flex;
        height: 48px;
        border: 1px solid #2f5bea;
        border-radius: 2px;
        font-weight: 600;
        font-size: 20px;
        width: 100%;
        padding-left: 10px;
      }
    }
    .reward-detail {
      padding: 10px;

      & > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        &:last-child {
          margin-bottom: 0;
        }
      }

      img {
        height: 12px;
        width: 12px;
        margin-right: 10px;
      }
    }
  }
}
</style>