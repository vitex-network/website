<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 style="margin-bottom: 50px;">{{$t('nav.mine')}}</h1>
        <piechart :page="`mine`" :type="`referral`"></piechart>
      </div>
    </section>
  </div>

</template>

<script>
  import piechart from '~/components/VitexInfo/Piechart';

  export default {
    components: {
      piechart
    }
  };
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
  @import "assets/vars.scss";
  .section {
    padding-top: 92px;
    @include touch {
      padding-top: 25px;
    }
  }


</style>
