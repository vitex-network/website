<template>
  <div>
    <div class="card is-flex">
      <div class="left is-flex">
        <div class="pic"></div>
        <div class="info">
          <div class="name">{{ name }}</div>
          <div class="is-flex">
            <img src="~/assets/images/operators/address.svg"/>
            <a href="">hhhhhh</a>
          </div>
          <div class="is-flex">
            <img src="~/assets/images/operators/link.svg"/>
            <a href="">hhhhhh</a>
          </div>
        </div>
      </div>
      <div class="right">
        加大拿回家撒旦
      </div>
    </div>
    <div class="desc-wrapper">
      <commonTitle :title="`详细介绍`"></commonTitle>
      <div class="introduction">
         Vite 是一个通用的去中心化应用平台，在兼顾安全性的同时，满足了工业级应用对高吞吐、低延迟和扩展性的要求。Vite 致力于解决基础链目前的性能和扩展性问题，以便在基础链上能搭建出真正实用且高频的应用。Vite 是一个通用的去中心化应用平台，在兼顾安全性的同时，满足了工业级应用对高吞吐、低延迟和扩展性的要求。Vite 致力于解决基础链目前的性能和扩展性问题，以便在基础链上能搭建出真正实用且高频的应用。Vite 是一个通用的去中心化应用平台，在兼顾安全性的同时，满足了工业级应用对高吞吐、低延迟和扩展性的要求。Vite 致力于解决基础链目前的性能和扩展性问题，以便在基础链上能搭建出真正实用且高频的应用。Vite 是一个通用的去中心化应用平台，在兼顾安全性的同时，满足了工业级应用对高吞吐、低延迟和扩展性的要求。Vite 致力于解决基础链目前的性能和扩展性问题，以便在基础链上能搭建出真正实用且高频的应用。Vite 是一个通用的去中心化应用平台，在兼顾安全性的同时，满足了工业级应用对高吞吐、低延迟和扩展性的要求。Vite 致力于解决基础链目前的性能和扩展性问题，以便在基础链上能搭建出真正实用且高频的应用。
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
  props: {
    name: {
      type: String,
      default: ''
    }
  }
};
</script>
<style lang="scss" scoped>
.card {
  height: 152px;
  width: 100%;
  border:1px solid rgba(0,60,255,0.02);
  background: url("~assets/images/bg/operator.png");
  justify-content: space-between;
  padding: 30px;
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
      font-family:PingFangSC;
      font-weight:600;
      color:rgba(17,17,17,1);
      line-height:24px;
      margin-bottom: 20px;
    }
    img {
      margin-right: 6px;
    }
  }
  
}
.introduction {
  font-size:14px;
  font-family:PingFangSC;
  font-weight:400;
  color:rgba(84,86,90,1);
  line-height:20px;
}
</style>


