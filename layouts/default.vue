<template>
  <div class="public">
    <div
        class="navbar headroom"
        v-headroom
    >
      <div
          class="columns is-widescreen navbar"
          :class="{ 'is-open': navbarActive }"
          @click="onNavClick"
      >
        <div class="column is-1 navbar-brand">
          <div @click="onLogoClick">
            <nuxt-link
                class="navbar-item nav-item nav-item-logo"
                :to="localePath('index')"
            >
              <logo class="logo"></logo>
            </nuxt-link>
          </div>
        </div>

        <div
            class="navbar-menu column is-7 is-offset-3"
            :class="{ 'is-active': navbarActive, collapsing: collapsing }"
        >
          <div
              ref="navbarStart"
              class="navbar-start"
          >
            <a
                href="http://vite.net/"
                class="nav-item text-hover-transition"
                target="_blank"
            >
              {{$t(`nav.trade`)}}
            </a>
            <a
                href="http://vite.net/"
                class="nav-item text-hover-transition"
                target="_blank"
            >
              {{$t(`nav.mine`)}}
            </a>
            <a
                href="http://vite.net/"
                class="nav-item text-hover-transition"
                target="_blank"
            >
              {{$t(`nav.market`)}}
            </a>
            <div class="nav-item">
              <about></about>
            </div>
            <nuxt-link
                :key="item"
                :to="localePath(item)"
                class="nav-item text-hover-transition"
                :class="{active: routeName === item}"
                v-for="item in navs"
            >
              {{$t(`nav.${item}`)}}
            </nuxt-link>
            <a
                href="http://vite.net/"
                class="nav-item text-hover-transition"
                target="_blank"
            >
              {{$t(`nav.wallet`)}}
            </a>
          </div>
          <div
              ref="navbarEnd"
              class="navbar-end"
          >
            <div class="nav-item">
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
  import Logo from '~/components/Logo';
  import LangSelect from '~/components/LangSelect';
  import About from '~/components/About';
  import VFooter from '~/components/Footer';


  export default {
    components: {
      Logo,
      LangSelect,
      About,
      VFooter
    },
    head() {
      let {routeName} = this;
      console.log(routeName);
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
      openAirdropPage() {
        let lang = '';
        this.$i18n.locale !== 'en' ? lang = `/${this.$i18n.locale}` : lang = '';
        this.$router.push({path: `${lang}/airdrop/`});
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
      onBurgerClick() {
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
    background: no-repeat url("~assets/images/bg/bg1.svg");
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
      background-color: white;
    }
    .navbar-brand {
      height: $navbar-height;
      .nav-item {
        height: 100%;
        cursor: pointer;
      }
    }
    .nav-item {
      padding: 0.5rem 30px;
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
      margin-top: 41px;
    }
    .navbar {
      min-height: 40px;
      height: auto;
      .navbar-brand {
        min-height: 40px;
        height: 40px;
        .logo {
          max-height: 20px;
          transition: transform 0.4s ease-in-out;
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
