<template>
  <div class="footer">
    <footer class="container">
      <div class="ft-container">
        <div class="is-flex-desktop whole-footer">
          <div class="icon-wrapper">
            <img class="logo" src="~/assets/images/footer_logo.svg"/>
            <div class="subtitle">{{$t('footer.slogan')}}</div>
            <div class="social-icons">
              <div class="icons">
                <div class="icon-links-wrapper">
                  <a
                      :href="urls.telegramx[$i18n.locale]"
                      target="_blank"
                      class="text-hover-transition"
                  >
                    <img
                        class="icon"
                        src="~/assets/images/social/telegram.svg"
                    />
                  </a>
                  <a
                      :href="urls.twitter"
                      target="_blank"
                      class="text-hover-transition"
                  >
                    <fa-icon
                        class="icon"
                        :icon="['fab', 'twitter']"
                    ></fa-icon>
                  </a>
                  <a
                      :href="urls.forum"
                      target="_blank"
                      class="text-hover-transition"
                  >
                    <img
                        class="icon forum"
                        src="~/assets/images/social/forum.svg"
                    /></a>
                  <a
                      :href="urls.weibo"
                      target="_blank"
                      class="text-hover-transition"
                  >
                    <fa-icon
                        class="icon"
                        :icon="['fab', 'weibo']"
                    /></a>
                  <wechat></wechat>
                  <qq v-if="$i18n.locale === 'zh'" class="margin-left"></qq>
                  <a
                      :href="urls.cmc[$i18n.locale]"
                      target="_blank"
                      class="text-hover-transition"
                      style="margin-left: 22px;"
                  >
                    <img
                        class="icon"
                        src="~/assets/images/social/cmc.png"
                    /></a>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-tab is-half">
            <div class="item exchange">
              <a
                  class="subtitle"
                  :href="urls.vitex[$i18n.locale]"
                  target="_blank"
              >
                {{$t('footer.trade')}}
              </a>
            </div>
            <div class="item">
              <nuxt-link
                  :to="localePath('mine')"
                  class="subtitle"
              >
                {{$t('nav.mine')}}
              </nuxt-link>
            </div>
            <div class="item">
              <nuxt-link
                  :to="localePath('dividend')"
                  class="subtitle"
              >
                {{$t('nav.dividend')}}
              </nuxt-link>
            </div>
            <div class="item about">
              <div class="subtitle">{{$t('footer.about')}}</div>
              <!--<a-->
                  <!--:href="urls.api[$i18n.locale]"-->
                  <!--class="content"-->
                  <!--target="_blank"-->
              <!--&gt;-->
                <!--{{$t('about.api')}}-->
              <!--</a>-->
              <a
                  :href="urls.website[$i18n.locale]"
                  class="content"
                  target="_blank"
              >
                {{$t('about.website')}}
              </a>
            </div>
            <div class="item user">
              <div class="subtitle">{{$t('footer.user')}}</div>
              <a class="content"
                 :href="urls.privacy"
                 target="_blank"
              >
                {{$t('user.protocol')}}
              </a>
              <a class="content"
                 :href="urls.list[$i18n.locale]"
                 target="_blank"
              >
                {{$t('user.list')}}
              </a>
              <a class="content" :href="`mailto:info@vite.org`">{{$t('user.contact')}}</a>
            </div>
            <div class="item common">
              <nuxt-link
                  class="subtitle"
                  :to="localePath('faq')"
              >
                {{$t('info.faq')}}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="copyright">
        <span>
          © 2018-{{thisYear}} VITE Labs. All Rights Reserved.
        </span>
      </div>
    </footer>
  </div>
</template>

<script type="text/babel">
  import Logo from '~/components/navs/Logo';
  import Wechat from '~/components/navs/Wechat';
  import Qq from '~/components/navs/QQ';
  import Telegram from '~/components/navs/Telegram';
  import config from '~/config.js';
  import about from '~/components/navs/About';

  export default {
    components: {
      Logo,
      Wechat,
      Telegram,
      about,
      Qq
    },
    data() {
      let {urls} = config;
      return {
        urls,
        aboutList: ['tokenUrl'],
        learnList: ['document', 'introduction'],
        mediumList: ['medium', 'btt', 'blog'],
        urlShouldTranslate: ['telegram', 'introduction'],
        navs: ['faq'],
        thisYear: new Date().getFullYear()
      };
    },
    methods: {
      getUrl(item) {
        if (this.urlShouldTranslate.indexOf(item) > -1) {
          return this.$t(`urlSrc.${item}`);
        }
        return config.urls[item];
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~assets/vars";

  .footer {
    background: #1E59F3;
    color: white;
    z-index: 3;
    padding: 0;
    .ft-container {
      padding: 90px 0 50px 0;
      justify-content: space-around;
      @include touch {
        padding: 40px 0 0 0;
        margin: 0 20px;
      }
    }
    @include touch {
      background: #1E59F3;
    }
    .whole-footer {
      justify-content: space-between;
      .icon-wrapper {
        .logo{
          padding-bottom: 12px;
        }
        .subtitle{
          font-size: 13px;
          color: white;
        }
      }
    }
    .footer-tab {
      display: flex;
      font-size: 12px;
      justify-self: flex-end;
      .item{
        margin-left: 50px;
        .subtitle{
          margin-bottom: 9px;
          font-size: 12px;
          font-family: $font-family-title;
          color: white;
        }
        .content{
          margin-bottom: 9px;
          color: white;
        }
        a{
          display: block;
        }
        @include touch {
          width: 83px;
          min-height: 48px;
          display: inline-block;
          margin-right: 0px;
          vertical-align: top;
          margin-left: 0px;
        }
      }
      @include touch {
        width: 100%;
        display: inline-block;
        margin: 48px auto;
      }
      .social-icons {
        margin-right: 10px;
        .forum {
          width: 28px;
        }
      }
    }
    .icons {
      text-align: left;
      color: white;
    }
    .copyright {
      padding-bottom: 38px;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      color: white;
      @include touch {
        text-align: center;
      }
    }

    .icon-links-wrapper {
      .margin-left{
        margin-left: 22px;
      }
      
      & > a,
      /deep/ .v-popover {
        img, svg {
          width: 20px;
          height: 20px;
          margin: 0 22px 0 0;
          color: white;
          &:hover {
            // color: #1580E3;
          }
          @include touch {
            width: 20px;
            height: 20px;
          }
        }
        @include touch {
          margin-right: 0px;
        }
      }
    }
    .links-wrapper {
      line-height: 1.75rem;
      @include touch {
        text-align: center;
      }
      & > div {
        &:first-child {
          font-size: 16px;
          font-family: $font-family-main;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 20px;
          line-height: 25px;
          @include touch {
            font-size: 15px;
            line-height: 21px;
            margin-bottom: 18px;
          }
        }
      }
    }
  }
</style>
