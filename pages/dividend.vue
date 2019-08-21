<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 style="margin-bottom: 50px;">{{$t('nav.dividend')}}</h1>
        <piechart></piechart>
      </div>
    </section>
  </div>

</template>

<script>
  import piechart from '~/components/VitexInfo/Piechart';
  
  export default {
    components: {
      piechart
    },
    computed: {
      totalList() {
        return [{
          title: '今日可挖量',
          value: 474647.20
        }, {
          title: '累计挖矿总量',
          value: 9654647.56
        }];
      }
    },
    async asyncData() {
    },
    data() {
      return {
        limitData: null
      };
    },
  };
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
  @import "assets/vars.scss";
  .section {
    padding-top: 92px;
    background:rgba(246,248,249,1);
    @include touch {
      padding-top: 25px;
    }
    .is-info {
      margin-bottom: 10px;
      h3 {
        margin-bottom: 12px;
        font-size: 20px;
        font-family: $font-family-main;
        color: #171C34;
        line-height: 28px;
        
        @include touch {
          font-size: 17px;
          line-height: 24px;
          margin-bottom: 10px;
        }
      }
      .answer {
        font-size: 14px;
        font-family: $font-family-light;
        color: #919AA3;
        line-height: 20px;
        img {
          max-width: 200px;
          margin-top: 0.5rem;
        }
        p {
          &:first-child {
            margin-top: 0;
          }
        }
        @include touch {
          font-size: 14px;
          line-height: 16px;
        }
      }
    }
  }

  
</style>
