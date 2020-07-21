<template>
  <div class="dropdown lang-btn is-hoverable">
    <div class="dropdown-trigger">
      <button
        class="button"
      >
        <span>{{$t('nav.download')}}</span>
      </button>
    </div>
    <div
      class="dropdown-menu"
      id="lang-dropdown-menu"
      role="menu"
    >
      <div class="dropdown-content">
        <a
            v-for="(item, index) in list"
            class="dropdown-item"
            target="_blank"
            :href="url[item]"
        >
          {{$t(`download.${item}`)}}
        </a>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import config from '~/config';

export default {
  components: {

  },
  props: {
    isFooter: {
      type: Boolean,
      default: false
    }
  },
  computed:{
    url(){
      return {
        app: config.urls.download.app,
        desktop:config.urls.download.desktop
      };
    }
  },
  data(){
    return{
      list: ['app','desktop']
    };
  }

};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~assets/vars";
.lang-btn {
  .dropdown-trigger {
    button {
      color: $common-text-color;
      background: transparent;
      padding: 0 1rem 0 0;
      border-radius: 0.35rem;
      height: (40rem/16);
      border: transparent;
      font-size: 14px;
      font-family: $font-family-light;
      &:focus {
        border: none;
        box-shadow: none;
      }
      &:hover {
        color: $common-active-color;
      }
      &::after {
        border: 2px solid $common-text-color;
        margin-top: -.375em;
        right: -0.2rem;
        border-radius: 2px;
        border-right: 0;
        border-top: 0;
        content: " ";
        display: block;
        height: .625em;
        pointer-events: none;
        position: absolute;
        top: 50%;
        transform: rotate(-45deg);
        transform-origin: center;
        width: .625em;
      }
    }
  }
  .dropdown-menu {
    .dropdown-content {
      .dropdown-item {
        color: $common-text-color;
        &:hover {
          background-color: whitesmoke;
          color: $common-active-color;
        }
      }
    }
  }
}
</style>


