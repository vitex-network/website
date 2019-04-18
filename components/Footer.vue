<template>
  <div class="container">
    <footer class="footer">
      <div class="ft-container">
        <div class="is-flex whole-footer">
          <div class="icon-wrapper is-hidden-touch">
            <logo></logo>
            <div class="subtitle">{{$t('home.slogan')}}</div>
            <div class="social-icons">
              <div class="icons">
                <div class="icon-links-wrapper">
                  <a
                      :href="urls.github"
                      target="_blank"
                      class="text-hover-transition"
                  >
                    <fa-icon
                        class="icon"
                        :icon="['fab', 'github']"
                    ></fa-icon>
                  </a>
                  <a
                      :href="urls.discord"
                      target="_blank"
                      class="text-hover-transition"
                  >
                    <fa-icon
                        class="icon"
                        :icon="['fab', 'discord']"
                    ></fa-icon>
                  </a>
                  <a
                      :href="urls.forum"
                      target="_blank"
                      class="text-hover-transition"
                  >
                    <img
                        class="icon"
                        src="~/assets/images/social/medium.svg"
                    /></a>
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
                  <telegram></telegram>
                  <a
                      :href="urls.reddit"
                      target="_blank"
                      class="text-hover-transition"
                  >
                    <fa-icon
                        class="icon"
                        :icon="['fab', 'reddit']"
                    /></a>
                  <a
                      :href="urls.youtube"
                      target="_blank"
                      class="text-hover-transition"
                  >
                    <fa-icon
                        class="icon"
                        :icon="['fab', 'youtube']"
                    /></a>
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
                </div>
              </div>
            </div>
          </div>
          <div class="footer-tab is-half">
            <div class="item exchange">
              <div class="subtitle">{{$t('footer.trade')}}</div>
            </div>
            <div class="item about">
              <div class="subtitle">{{$t('footer.about')}}</div>
              <a
                  :href="urls.api"
                  class="content"
              >
                {{$t('about.api')}}
              </a>
              <a
                  :href="urls.api"
                  class="content"
              >
                {{$t('about.website')}}
              </a>
            </div>
            <div class="item user">
              <div class="subtitle">{{$t('footer.user')}}</div>
              <a class="content">{{$t('user.protocol')}}</a>
              <a class="content">{{$t('user.list')}}</a>
              <a class="content">{{$t('user.contact')}}</a>
            </div>
            <div class="item common">
              <div class="subtitle">{{$t('footer.info')}}</div>
              <a class="content">{{$t('info.faq')}}</a>
              <a class="content">{{$t('info.fee')}}</a>
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
  import Logo from '~/components/Logo';
  import Wechat from '~/components/Wechat';
  import Telegram from '~/components/Telegram';
  import config from '~/config.js';
  import about from '~/components/About';

  export default {
    components: {
      Logo,
      Wechat,
      Telegram,
      about
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
    height: 300px;
    background: white;
    z-index: 3;
    padding: 0;
    .ft-container {
      padding: 90px 0 50px 0;
      justify-content: space-around;
    }
    @include touch {
      background: white;
    }
    .whole-footer {
      justify-content: space-between;
      .icon-wrapper {
        .subtitle{
          font-size: 13px;
          color: $common-text-color;
        }
      }
    }
    .footer-tab {
      display: flex;
      font-size: 12px;
      justify-self: flex-end;
      .item{
        margin-right: 80px;
        .subtitle{
          margin-bottom: 9px;
          font-size: 12px;
          font-family: $font-family-title;
          color: $text-color;
        }
        .content{
          margin-bottom: 9px;
          color: $common-text-color
        }
        a{
          display: block;
        }
      }
      @include touch {
        margin: 0 auto;
      }
      @include mobile {
        width: 100%;
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
      color: $common-text-color;
    }
    .copyright {
      font-size: 12px;
      text-align: center;
      color: $common-text-color;
      @include touch {
        text-align: center;
      }
    }

    .icon-links-wrapper {
      @include touch {
        text-align: center;
      }
      & > a,
      /deep/ .v-popover {
        img, svg {
          width: 20px;
          height: 20px;
          margin: 0 22px 0 0;
          color: $common-text-color;
          &:hover {
            // color: #1580E3;
          }
          @include touch {
            width: 20px;
            height: 20px;
          }
        }
        @include touch {
          margin-right: 22px;
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
