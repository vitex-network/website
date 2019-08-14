<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 style="margin-bottom: 50px;">{{$t('nav.mine')}}</h1>
        <div class="market-table">
          <tab-list></tab-list>
          <vitex-input 
            class="market-search-input" 
            v-model="searchText"
            :placeholder="`请搜索`">
            <img slot="before" class="icon" src="~assets/images/search.svg"/>
          </vitex-input>
        </div>
        <div>
          <info-total-card></info-total-card>
        </div>
        <div>
          <info-card></info-card>
        </div>
      </div>
    </section>
  </div>

</template>

<script>
  import InfoCard from '~/components/InfoCard.vue';
  import InfoTotalCard from '~/components/InfoTotalCard.vue';
  import tabList from '~/components/market/tabList.vue';
  import VitexInput from '~/components/VitexInput.vue';

  export default {
    components: {
      InfoCard,
      InfoTotalCard,
      tabList,
      VitexInput
    },
    computed: {
      totalList() {
        return [{
          title: '今日可挖量',
          value: 474647.20
        }, {
          title: '累计挖矿总量',
          value: 9654647.56
        }]
      }
    },
    data() {
      return {
        searchText: ''
      }
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

  .market-search-input.input-wrapper {
    box-sizing: border-box;
    height: 20px;
    line-height: 20px;
    border: none;

    .icon {
        width: 12px;
        height: 12px;
        margin: 4px 6px 4px 6px;
    }

    input {
        text-indent: 0;
        font-weight: 400;
        font-size: 11px;
        background: rgba(245, 250, 255, 1);
    }
}

</style>
