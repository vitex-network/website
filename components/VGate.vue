<template>
  <div class="vgate">
    <div class="container">
      <div class="is-size-1-desktop is-size-2-touch slogan-wrapper">
        <h1>
          {{$t('vgate.slogan')}}
        </h1>
      </div>
      <div class="operators">

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
    methods:{
      openVGate(){
        window.open(
          this.$i18n.locale === 'zh' ? 'https://forms.gle/eG66BnL3btbFNvH59' : 'https://forms.gle/eG66BnL3btbFNvH59'
        );
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
    @include touch {
      height: 220px;
    }
    .slogan-wrapper {
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
        margin-top: 40px;
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