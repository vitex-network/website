<template>
  <div class="bv-modal" v-if="show">
    <div class="bv-modal-title">
      <span>{{$t('bvote.title')}}</span>
      <i class="icon-close" @click="hide"></i>
    </div>
    <div class="bv-modal-body">
      <div class="bv-modal-img"></div>
      <p v-for="p in $t('bvote.body')" :key="p" v-html="p"></p>
      <a class="bv-btn" :href="$t('bvote.btn.link')" target="_blank">{{$t('bvote.btn.text')}}</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  },
  methods: {
    hide() {
      this.show = false;
    }
  }
};
</script>

<style>
.bv-modal {
  position: fixed;
  z-index: 10000;
  right: 100px;
  bottom: 110px;
  width: 380px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 48px 1px rgba(176, 192, 237, 0.42);
  border-radius: 2px;
  font-size: 14px;
  line-height: 20px;
  color: #1d2024;
}
.bv-modal-title {
  font-size: 14px;
  line-height: 50px;
  background: rgba(38, 142, 255, 1);
  border-radius: 2px 2px 0px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;
  color: #fff;
}
.bv-modal-body {
  padding: 30px;
}
.bv-modal-body span {
    font-weight: bold;
}
.bv-modal-body p:first-of-type {
    margin-bottom: 10px;
}
.icon-close {
  display: block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  background: url("./images/icon-close.png") center / 100%;
}
.bv-modal-img {
  width: 100px;
  height: 100px;
  margin: 0 auto 30px;
  background: url("./images/icon-vote.png") center / 100%;
}
.bv-btn {
    display: block;
  width: 200px;
  margin: 30px auto 0;
  text-align: center;
  font-size: 14px;
  line-height: 40px;
  background: rgba(0, 122, 255, 1);
  border-radius: 2px;
  color: #fff;
}
.bv-btn:hover {
    color: #fff;
}
</style>
