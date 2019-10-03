<template>
  <div>
    <div class="card is-flex"  v-if="operatorInfo">
      <div class="left is-flex">
        <img :src="operatorInfo.icon" class="pic"/>
        <div class="info">
          <div class="name">{{ operatorInfo.name }}</div>
          <div class=" is-flex">
            <img src="~/assets/images/operators/address.svg"/>
            <a :href="`https://explorer.vite.net/account/${operatorInfo.address}`" target="_blank" class="address">{{ operatorInfo.address }}</a>
          </div>
          <div class="is-flex" v-if="operatorInfo.links && operatorInfo.links.website">
            <img src="~/assets/images/operators/link.svg"/>
            <a :href="operatorInfo.links.website[0]" target="_blank">{{ operatorInfo.links.website[0] }}</a>
          </div>
        </div>
      </div>
      <div class="right is-flex __pointer" v-if="operatorInfo.links">
        <a :href="operatorInfo.links.facebook[0]" v-if="operatorInfo.links.facebook" target="_blank">
          <img src="~/assets/images/operators/facebook.svg"/>
        </a>
        <a :href="operatorInfo.links.twitter[0]" v-if="operatorInfo.links.twitter" target="_blank">
          <img src="~/assets/images/operators/twitter.svg"/>
        </a>
        <a :href="operatorInfo.links.telegram[0]" v-if="operatorInfo.links.telegram" target="_blank">
          <img src="~/assets/images/operators/twitter.svg"/>
        </a>
      </div>
    </div>
    <div class="desc-wrapper">
      <commonTitle :title="$t('operator.detail.introduction')"></commonTitle>
      <div class="introduction">
        {{ operatorInfo && operatorInfo.overview && operatorInfo.overview[$i18n.locale] }}
      </div>
    </div>
  </div>
</template>
<script>
import commonTitle from './commonTitle';
export default {
  components: {
    commonTitle
  },
  created() {
    this.operatorInfo = this.$store.state.exchangeMarket.currentOperatorInfo;
  },
  data() {
    return {
      operatorInfo: null
    };
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/vars";

.card {
  // height: 152px;
  width: 100%;
  border-radius:2px;
  border:1px solid rgba(0,60,255,0.02);
  background: url("~assets/images/bg/operator.png");
  padding: 30px;
  align-items: flex-start;
  @include mobile {
    flex-direction: column;
    padding: 15px 15px 11px 15px;
  }
  .address {
    @include mobile {
      display: inline-block;
      width: 185px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .pic {
    width:70px;
    height:70px;
    background:rgba(255,255,255,1);
    border-radius:5px;
    border:1px solid rgba(231,234,238,1);
    margin-right: 20px;
  }
  .info {
    .name {
      font-size:20px;
      font-family:$font-family-light;
      font-weight:600;
      color:rgba(17,17,17,1);
      line-height:24px;
      margin-bottom: 20px;
    }
    img {
      margin-right: 6px;
    }
  }
  .right {
    @include mobile {
      margin-top: 12px;
    }
    img {
      margin-left: 14px;
      @include mobile {
        margin-left: 0;
        margin-right: 14px;
      }
    }
  }
  
}
.introduction {
  font-size:14px;
  font-family:$font-family-light;
  font-weight:400;
  color:rgba(84,86,90,1);
  line-height:20px;
}
</style>


