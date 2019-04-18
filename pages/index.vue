<template>
  <div>
    <section class="hero home">
      <div class="hero-body">
        <div class="container">
          <div class="is-size-1-desktop is-size-2-touch slogan-wrapper">
            <h1>
              {{$t("home.slogan")}}
            </h1>
          </div>
          <div class="btn">
            <div
                class="start-btn"
                @click="openViteX"
            >{{$t('home.starttoUse')}}</div>
          </div>
        </div>
      </div>
    </section>
    <slider></slider>
    <vitex-info></vitex-info>
    <use-vitex></use-vitex>
    <v-gate></v-gate>
  </div>
</template>

<script>
  import VitexInfo from '~/components/VitexInfo';
  import UseVitex from '~/components/UseVitex';
  import VGate from '~/components/VGate';
  import Slider from '~/components/Slider';

  export default {
    components: {
      VitexInfo,
      UseVitex,
      VGate,
      Slider
    },
    methods:{
      openViteX(){
        window.open(
          this.$i18n.locale === 'zh' ? 'https://vite.net/zh/' : 'https://vite.net'
        );
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "assets/vars.scss";

  .section-title {
    text-align: center;
    font-size: 2rem;
    color: #111111;
    font-family: $font-family-light;
    font-weight: normal;
    margin-bottom: 3rem;
  }

  .home {
    position: relative;
    font-family: $font-family-title;
    @include touch {
      .hero-body {
        display: block;
      }
    }

    .slogan-wrapper {
      margin-top: 155px;
      padding-bottom: 40px;
      text-align: center;
      h1 {
        font-size: 32px;
      }
      @include touch {
        max-width: unset;
      }
      @include mobile {
        margin-top: 0;
      }
    }
    .btn{
      text-align: center;
      .start-btn {
        display: inline-block;
        width: 170px;
        height: 55px;
        line-height: 53px;
        border-radius: 5px;
        color: white;
        font-size: 16px;
        background: $common-active-color;
        cursor: pointer;
        @include touch {
          width: 100px;
          font-size: 12px;
        }
      }
    }
  }
</style>