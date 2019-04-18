<template>
  <!-- You can find this swiper instance object in current component by the "mySwiper"  -->
  <div class="container">
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="banner in banners">
          <img :src="banner">
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-bullets"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </div>
  </div>
</template>

<script>
  import en from '~/assets/images/banner/en.jpg';
  import zh from '~/assets/images/banner/zh.jpg';
  import pie from '~/assets/images/piechart.png';

  export default {
    data () {
      return {
        banners: [ en, zh, pie ],
        swiperOption: {
          loop: true,
          slidesPerView: 1,
          centeredSlides: true,
          spaceBetween: 30,
          // autoplay: {
          //   delay: 3000,
          //   disableOnInteraction: false
          // },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: false
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          on: {
            slideChange() {
              console.log('onSlideChangeEnd', this);
            },
            tap() {
              console.log('onTap', this);
            }
          }
        }
      };
    }
  };
</script>


<style lang="scss" scoped>
  .swiper-container{
    height: 300px;
  }
  .my-swiper {
    height: 300px;
    width: 100%;
    .swiper-slide {
      text-align: center;
      font-size: 38px;
      font-weight: 700;
      background-color: #eee;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .swiper-pagination {
      text-align: center;
      > .swiper-pagination-bullet {
        /*background-color: red;*/
      }
    }
  }
  .swiper-button-prev{
    width: 112px;
    height: 112px;
    background: url("~assets/images/Left-arrow.svg") no-repeat center;
    background-size: 68px 68px;
  }
  .swiper-button-next{
    width: 112px;
    height: 112px;
    background: url("~assets/images/Right-arrow.svg") no-repeat center;
    background-size: 68px 68px;
  }
</style>