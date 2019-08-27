<template>
    <div>
      <div class="card-wrapper">
          <div class="item __pointer" v-for="(item, index) in list" :key="index" 
            @mouseenter="!isMobile ? enter(index) : null" @mouseleave="!isMobile ? leave() : null">
            <div class="desc-wrapper is-flex" v-if="seen && index === current">
              <div>
                <div class="desc-top">{{ $t('indexPage.mine.tx.predict') }}</div>
                <div class="desc-bottom">1000 VX</div>
              </div>
            </div>
            <div v-if="seenList[index]">
              <div class="is-flex token">
                <div class="token-left">
                  <div>{{ item.tokenSymbol }} </div>
                  <div class="vx-amount">{{ item.amount }}</div>
                  <div v-if="item.mainBtcAmount" class="amount-btc">≈ {{ item.mainBtcAmount }} BTC</div>
                </div>
                <div class="token-right">
                  <img :src="item.img"/>
                </div>
              </div>
              <div class="is-flex token-bottom" v-if="!isSimple">
                <div class="token-left">
                  <div>{{ $t('indexPage.mine.tx.fee') }}</div>
                </div>
                <div class="token-right">
                  <div>{{ item.fee }} VITE</div>
                  <div>≈ {{ item.btcFee }} BTC</div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
</template>
<script>
import commonTitle from './commonTitle';
import isMobile from 'is-mobile';
export default {
  components: {
    commonTitle
  },
  props: {
    isSimple: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: ()=> []
    }
  },
  data() {
    return {
      isMobile: isMobile(),
      seen:false,
      current:0,
      seenList: [true, true, true, true]
    };
  },
  methods: {
    enter(index){
      if(this.isSimple) return;
      this.seen = true;
      this.current = index;
      this.seenList[index] = false;
    },
    leave(){
      if(this.isSimple) return;
      this.seen = false;
      this.current = null;
      this.seenList = [true, true, true, true];
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/vars.scss";
.card-wrapper {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  @include mobile {
    flex-direction: column;
  }
  .item {
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 9px 0px rgba(0,0,0,0.07);
    border-radius:5px;
    border:1px solid rgba(231,234,238,1);
    width: 255px;
    font-size:14px;
    font-family:$font-family-light;
    color:rgba(84,86,90,1);
    line-height:18px;
    @include mobile {
      width: 100%;
      margin-bottom: 10px;
    }
  }
  .desc-wrapper {
    background:rgba(30,89,243,1);
    box-shadow:0px 2px 9px 0px rgba(0,0,0,0.2);
    border-radius:5px;
    color: white;
    height: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family:$font-family-light;
    .desc-top {
      font-weight:400;
      line-height:16px;
      font-size: 14px;
    }
    .desc-bottom {
      font-size:20px;
      font-weight:600;
      line-height:25px;
      margin-top: 8px;
    }
  }
  .amount-btc {
    font-size:12px;
    font-family:$font-family-light;
    font-weight:400;
    color:rgba(84,86,90,1);
    line-height:16px;
  }
  .token {
    box-sizing: border-box;
    padding: 20px;
    padding-bottom: 10px;
    justify-content: space-between;
    .vx-amount {
      margin-top: 15px;
      color:rgba(23,28,52,1);
      line-height:22px;
      font-size:18px;
      font-family:$font-family-title;
    }
  }
  .token-bottom {
    padding: 9px 20px 20px 20px;
    justify-content: space-between;
    border-top: 1px solid #E7EAEE;
    font-size:12px;
    font-family:$font-family-light;
    font-weight:400;
    color:rgba(84,86,90,1);
    line-height:16px;
  }
}


</style>