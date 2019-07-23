<template>
  <div class="public"
       :class="`is-${routeName}-public`"
  >
    <div
        class="navbar headroom"
        v-headroom
    >
      <div
          class="columns is-widescreen navbar"
          :class="{ 'is-open': navbarActive }"
          @click="onNavClick"
      >
        <div class="column is-1-desktop navbar-brand">
          <div @click="onLogoClick">
            <nuxt-link
                class="navbar-item nav-item nav-item-logo"
                :to="localePath('index')"
            >
              <logo class="logo"></logo>
            </nuxt-link>
          </div>
          <div
              class="navbar-burger"
              @click="onBurgerClick"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div
            class="navbar-menu column is-7-desktop is-offset-3"
            :class="{ 'is-active': navbarActive, collapsing: collapsing }"
        >
          <div
              ref="navbarStart"
              class="navbar-start"
          >
            <a
                href="https://x-test.vite.net/"
                class="nav-item text-hover-transition"
                target="_blank"
            >
              {{$t(`nav.trade`)}}
            </a>
            <!--<a-->
                <!--href="https://wallet.vite.net/"-->
                <!--class="nav-item text-hover-transition"-->
                <!--target="_blank"-->
            <!--&gt;-->
              <!--{{$t(`nav.mine`)}}-->
            <!--</a>-->
            <!--<a-->
                <!--href="https://wallet.vite.net/"-->
                <!--class="nav-item text-hover-transition"-->
                <!--target="_blank"-->
            <!--&gt;-->
              <!--{{$t(`nav.market`)}}-->
            <!--</a>-->
            <div class="nav-item">
              <user></user>
            </div>
            <div class="nav-item">
              <nuxt-link
                  :to="localePath('faq')"
                  class="text-hover-transition"
              >
                {{$t('nav.faq')}}
              </nuxt-link>
            </div>
            <div class="nav-item">
              <about></about>
            </div>
          </div>
          <div
              ref="navbarEnd"
              class="navbar-end"
          >
            <!--<div class="nav-end-item">-->
              <!--<wallet-btn :btn-type="'create'"></wallet-btn>-->
            <!--</div>-->
            <!--<div class="nav-end-item">-->
              <!--<wallet-btn :btn-type="'login'"></wallet-btn>-->
            <!--</div>-->
            <div class="nav-end-item">
              <lang-select></lang-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
        class="nuxt-content"
    >
      <nuxt :keep-alive="true"></nuxt>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script type="text/babel">
  import config from '~/config';
  import Logo from '~/components/navs/Logo';
  import LangSelect from '~/components/navs/LangSelect';
  import User from '~/components/navs/User';
  // import Info from '~/components/navs/Faq';
  import About from '~/components/navs/About';
  import WalletBtn from '~/components/navs/WalletBtn';
  import VFooter from '~/components/navs/Footer';


  export default {
    components: {
      Logo,
      LangSelect,
      About,
      User,
      // Info,
      WalletBtn,
      VFooter
    },
    head() {
      let {routeName} = this;
      let title = this.$t(`nav.${routeName}`) + ' - ' + this.$t('head.title');

      let description = this.$t(`head.description.${routeName}`);
      let iconUrl = 'https://vite.org/icon.png';
      let structuredData = [
        {
          '@context': 'http://schema.org',
          '@type': 'Organization',
          url: 'https://vite.org',
          name: 'Vite labs.',
          description: description,
          image: iconUrl,
          brand: {
            '@type': 'Brand',
            name: 'VITE',
            logo: iconUrl
          },
          sameAs: [config.urls.twitter]
        }
      ];
      return {
        meta: [
          {hid: 'description', name: 'description', content: description},
          {
            name: 'google-site-verification',
            content: 'MyUvG14lvMm-nYCWoXYE9NT21vRda-kIT6xMETrGqZk'
          },
          // Open Grapg
          {name: 'og:title', content: title, hid: 'og:title'},
          {name: 'og:description', content: description, hid: 'og:description'},
          {name: 'og:type', content: 'website', hid: 'og:type'},
          {name: 'og:url', content: 'https://vite.org', hid: 'og:url'},
          {name: 'og:image', content: 'https://www.vite.org/icon.png'},

          // Twitter Card
          {name: 'twitter:card', content: 'summary', hid: 'twitter:card'},
          {name: 'twitter:site', content: '@vitelabs', hid: 'twitter:site'},
          {name: 'twitter:title', content: title, hid: 'twitter:title'},
          {
            name: 'twitter:description',
            content: description,
            hid: 'twitter:description'
          },
          {
            name: 'twitter:image:alt',
            content: 'Vite Logo',
            hid: 'twitter:image:alt'
          },
          {
            name: 'twitter:image',
            content: 'https://www.vite.org/logo_appstore.png'
          }
        ],
        __dangerouslyDisableSanitizers: ['script'],
        script: structuredData.map(item => {
          return {
            innerHTML: JSON.stringify(item),
            type: 'application/ld+json'
          };
        })
      };
    },
    data: function () {
      return {
        navbarActive: false,
        navs: ['faq'],
        collapsing: false,
        urls: config.urls
      };
    },
    computed: {
      routeName() {
        if (!this.$route || !this.$route.name) return 'index';
        return this.$route.name.split('-')[0];
      },
      navbarEndStyle() {
        if (this.navbarActive) {
          return {
            height: this.$refs.navbarEnd.clientHeight + 'px',
            overflowY: this.collapsing ? 'hidden' : 'visible'
          };
        } else {
          return {
            height: 0
          };
        }
      }
    },
    methods: {
      openDotNet() {
        window.open(
          'https://international.bittrex.com/Market/Index?MarketName=BTC-VITE'
          // this.$i18n.locale === 'zh' ? 'https://vite.net/zh/' : 'https://vite.net'
        );
      },
      onNavClick(e) {
        let {target} = e;
        if (
          target &&
          target.className &&
          typeof target.className === 'string' &&
          target.className.indexOf('nav-item') > -1
        ) {
          this.navbarActive = false;
        }
      },
      onLogoClick() {
        this.navbarActive = false;
      },
      onBurgerClick () {
        this.collapsing = true;
        this.navbarActive = !this.navbarActive;
        setTimeout(() => {
          this.collapsing = false;
        }, 500);
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "assets/vars.scss";

  .public {
    width: 100%;
  }

  .is-index-public {
    background: no-repeat url("~assets/images/bg/bg1.svg");
    @include touch {
      background-size: auto 432px;
    }

  }

  .nuxt-content {
    @include touch {
      padding-bottom: 50px;
    }
  }

  .navbar {
    width: 100%;
    border-bottom: 1px solid transparent;
    z-index: 222222;
    background: transparent;
    &.headroom--not-top {
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      background: white;
    }
    @include desktop {
      &.is-index-page.headroom--top {
        background: transparent;
      }
    }
    a.navbar-item:hover {
      background-color: transparent;
    }
    .navbar-start{
      margin-left: 30px;
    }
    .navbar-end{
      margin-top: 8px;
    }
    .navbar-brand {
      margin: 30px 0 0 45px;
      padding: 0;
      .nav-item {
        height: 100%;
        cursor: pointer;
      }
      @include mobile{
        margin: 20px;
      }
    }

    .nav-item {
      padding: 0.5rem 20px;
      color: $common-text-color;
      font-family: $font-family-light;
      font-size: 14px;
      &:hover {
        color: $common-active-color;
      }
      &.active {
        color: $common-active-color;
      }
    }
    .nav-end-item{
      padding: 0.5rem 10px;
      &:hover {
        color: $common-active-color;
      }
      &.active {
        color: $common-active-color;
      }
    }
    .nav-item-logo {
      max-width: 180px;
      padding: 0;
    }
    .navbar-menu {
      display: flex;
      @include desktop {
        height: auto !important;
      }
    }
  }

  @include touch {
    .nuxt-content {
      margin-top: 60px;
    }
    .navbar {
      min-height: 40px;
      height: auto;
      .navbar-brand {
        min-width: 112px;
        min-height: 40px;
        height: 40px;
        .nav-item{
          padding: 10px 0;
        }
        .logo {
          max-height: 30px;
          transition: transform 0.4s ease-in-out;
          &:hover{

          }
        }
        .navbar-burger {
          top: -32px;
          height: 20px;
          width: 20px;
          span {
            width: 19px;
            right: 50%;
            left: auto;
            margin-right: -10px;
            transition: all 0.3s ease-in-out;
          }
        }
      }

      .is-open {
        .navbar-brand {
          .logo {
            /*transform: translateX(16px);*/
            /*transform: rotate(30deg);*/
          }
          .navbar-burger {
            span {
              &:nth-child(2) {
                width: 19px;
              }
              &:nth-child(1),
              &:nth-child(3) {
                width: 9px;
                margin-right: -5px;
              }
            }
          }
        }
      }

      .nav-item {
        padding: 11px 16px;
      }

      .navbar-menu {
        padding: 0 32px;
        transition: all 0.5s ease-in-out;
        text-align: center;
        &:not(.is-active) {
          height: 0;
          overflow-y: hidden;
          display: block;
        }
        .navbar-start{
          height: 100%;
        }
        .navbar-end {
          padding: 0.5rem 0;
        }
        .nav-item {
          height: 48px;
          padding-left: 0;
        }
        .line {
          height: 1px;
          margin: 0.5rem 0;
          background: rgba(0, 0, 0, 0.05);
          padding: 0;
        }
      }

      & > .container {
        min-height: 40px;
        height: auto;
      }
    }
  }
</style>
