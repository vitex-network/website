<template>
  <!-- You can find this swiper instance object in current component by the "mySwiper"  -->
  <div class="container">
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(banner,index) in banners[$i18n.locale]" @click="onBannerClick" :key="index">
          <a :href="bannerUrls[$i18n.locale][index]" target="_blank">
            <img :src="banner">
          </a>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </div>
</template>

<script>
  import { urls } from '~/config.js';
  import en1 from '~/assets/images/banner/en.jpg';
  import vote_en from '~/assets/images/banner/vote_en.jpg';
  import vote_zh from '~/assets/images/banner/vote_zh.jpg';
  // import vitexTestEn from '~/assets/images/banner/vitexTestEn.png';
  import zh1 from '~/assets/images/banner/zh.jpg';
  // import vitexTestZh from '~/assets/images/banner/vitexTestZh.png';

  export default {
    data () {
      return {
        urls,
        banners: {
          en: [vote_en, en1],
          zh: [vote_zh, zh1]
        },
        bannerUrls:{
          en: ['https://www.binance.com/en/vote', urls.telegramx.en],
          zh: ['https://www.binancezh.com/cn/vote', urls.forum]
        },
        swiperOption: {
          loop: false,
          slidesPerView: 1,
          centeredSlides: true,
          spaceBetween: 30,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          // pagination: {
          //   el: '.swiper-pagination',
          //   clickable: true
          // },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          on: {
            slideChange() {
              // console.log(this.bannerUrls[this.$i18n.locale]);
            },
            tap() {
              // console.log('onTap', this);
            }
          }
        }
      };
    },
    methods:{
      onBannerClick(){

      }
    }
  };
</script>


<style lang="scss" scoped>
  @import "assets/vars.scss";

  .swiper-container{
    height: 300px;
    overflow: hidden;
    @include touch{
      height: 102px;
      overflow: hidden;
    }
    img {
       @include touch{
        width: 100%;
        height: 102px;
      }
    }
  }
  .swiper-pagination {
    text-align: center;
    /deep/ .swiper-pagination-bullet-active{
      background: #eee;
    }
  }

  .swiper-button-prev{
    width: 68px;
    height: 68px;
    left: 0;
    margin-top: 0;
    border-radius: 100%;
    box-shadow:0 2px 23px 0 rgba(0,0,0,0.06);
    transform: translate(-50%, -50%);
    background: url("~assets/images/Left-arrow.svg") no-repeat center;
    background-size: 68px 68px;
    outline: none;
    @include touch{
      display: none;
    }
  }
  .swiper-button-next{
    width: 68px;
    height: 68px;
    right: 0;
    margin-top: 0;
    border-radius: 100%;
    box-shadow:0 2px 23px 0 rgba(0,0,0,0.06);
    transform: translate(50%, -50%);
    background: url("~assets/images/Right-arrow.svg") no-repeat center;
    background-size: 68px 68px;
    outline: none;
    @include touch{
      display: none;
    }
  }
</style>