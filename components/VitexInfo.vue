<template>
  <section class="section">
    <div class="container">
      <div class="is-size-1-desktop is-size-2-touch slogan-wrapper">
        <h1>
          {{$t("vitexInfo.title")}}
        </h1>
        <p>{{$t("vitexInfo.desc")}}</p>
        <div class="text-btn">{{$t("vitexInfo.more")}}</div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "VitexInfo"
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "assets/vars.scss";

  .slogan-wrapper{
    text-align: center;
    h1 {
      font-size: 32px;
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
    .text-btn{
      text-align: center;
      font-size: 14px;
      color: $common-active-color;
    }
  }
</style>