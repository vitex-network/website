<template>
    <div class="order-arrow-wrapper __pointer" @click="_setOrderRule()">
      <div class="arrow-icon"></div>
      <div class="arrow-icon"></div>
    </div>
</template>

<script>
export default {
  props: {
    orderItem: {
      type: String,
      default: ''
    },
    setOrderRule: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      isUp: false
    };
  },
  methods: {
    _setOrderRule() {
      this.isUp = !this.isUp;
      const rule = `${ this.orderItem }${ this.isUp ? 'Up' : 'Down' }`;
      this.setOrderRule && this.setOrderRule(rule);
    }
  }
};
</script>

<style lang="scss" scoped>
.order-arrow-wrapper {
    display: inline-block;
    height: 100%;
    .arrow-icon {
        display: block;
        width: 16px;
        height: 50%;
        &:first-child {
            background: url("~assets/images/index/top_grey.svg") bottom no-repeat;
        }

        &:last-child {
            background: url("~assets/images/index/bottom_grey.svg") top no-repeat;
        }

    }
}
</style>
