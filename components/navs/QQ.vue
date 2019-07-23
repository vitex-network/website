<template>
  <no-ssr class="no-ssr">
    <v-popover
      offset="16"
      :disabled="!isEnabled"
      popoverClass="v-popover"
    >
      <a class="tooltip-target"  target="_blank">
        <img
            class="icon"
            src="~/assets/images/social/qq.svg"
        />
      </a>

      <template slot="popover">
        <img src="~/assets/images/social/qq.jpg" alt="">
      </template>
    </v-popover>

    <a slot="placeholder" target="_blank"><img
        class="icon"
        src="~/assets/images/social/qq.svg"
    /></a>
  </no-ssr>
</template>

<script type="text/babel">
  import { VPopover } from 'v-tooltip';

  export default {
    components: {
      VPopover
    },
    data: function () {
      return {
        isEnabled: true
      };
    },
    methods: {}
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  img {
    max-width: 200px;
    width: 200px;
  }
  .icon {
    height: 100%;
    width: 100%;
    margin-top: 5px;
    color: #C4C4C4;
    &:hover {
      color: #1580E3;
    }
  }
  .v-popover {
    display: inline-block;
    height: 30px;
    width: 30px;
  }

  .no-ssr {
    display: inline-block;
    height: 20px;
    width: 20px;
  }
</style>
