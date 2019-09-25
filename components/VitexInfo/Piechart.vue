<template>
  <div class="detail">
    <div class="question-en" v-if="page === 'mine' && $i18n.locale === 'en'">
      <div class="answer">
        <div class="title">What is ViteX?</div>
        <div class="content">
          <p>ViteX is a high-throughput decentralized exchange built on the Vite public chain with its own mineable currency​—​VX. ​For more details on the benefits of ViteX and the underlying technology, you can see this article ​<a href="https://medium.com/vitelabs/vitex-101-update-489f6e49392" target="_blank">​here​</a>.</p>
          <div class="main-btn">
            <a
                :href="piechart.urls.vitex[$i18n.locale]"
                class="text-white"
                target="_blank"
            >
              {{$t('home.starttoUse')}}!
            </a>
          </div>
        </div>
        <div class="title">What can I do with VX?</div>
        <div class="content">
          <ol>
            <li>You can ​trade ​it. Currently, 1 VX ~ 1 USD on ViteX with the following trading pairs: VX/BTC, VX/ETH, VX/USDT, and VX/VITE</li>
            <li>Even better, you can ​hodl ​it to receive daily dividends in BTC, ETH, USDT & VITE. Fees collected by the ViteX platform (transaction fees, listing fees, etc...) are put into a shared dividend pool that is distributed ​back​ to traders at a daily rate of 1%. All accounts with at least 10 VX are eligible to receive dividends. More details on dividends can be found <nuxt-link :to="localePath('dividend')">here</nuxt-link>​.</li>
          </ol>
          <p>Sound interesting? Sign up for a trading account now at <a href="https://x.vite.net/​" target="_blank">​https://x.vite.net/​</a>!</p>
        </div>
        <div class="title">How do I mine VX?</div>
        <div class="content">
          <p>Mining on ViteX is easy——no ASICs or complicated server set-ups required.</p>
          <ol>
            <li><span class="bold">Trading as Mining.</span> ​Each time you execute a trade (i.e. take an order off the order book), you get some VX. The amount of VX you receive will be calculated based on the proportion of the amount of trading fees that you paid to the total amount of trading fees collected by ViteX that day.</li>
            <li><span class="bold">Referring as Mining.​</span> Every trader will get a referral code that they can share with their friends. When your friends sign up, they get 10% off of all trading fees on ViteX indefinitely. You benefit as 5% of your referred friends' accumulated trading fees get counted towards your daily accumulated trading fees.</li>
            <li><span class="bold">Listing as Mining.</span> ​List new trading pairs to mine VX. A user (“token issuer” or an “operator”) that lists a new trading pair will also receive VX. The token issuer’s reward is calculated as if he/she executed a trade involving a transaction fee of 1,000 VITE.</li>
            <li><span class="bold">Staking as mining.</span> ​The Vite public chain requires quota to properly allocate is computing resources. Quota is obtained by staking VITE. If you stake VITE to help ViteX obtain the quota it requires to run, then you get VX.</li>
            <li><span class="bold">Market-making as Mining.​</span> Place orders to boost liquidity on ViteX and you’ll be rewarded with VX.
            </li>
          </ol>
          <p>You can find each mining method described in more detail <a href="https://medium.com/vitelabs/announcement-vx-mining-official-start-date-e66900b10888" target="_blank">here</a>​​.</p>
          <div class="main-btn">
            <a
                :href="piechart.urls.vitex[$i18n.locale]"
                class="text-white"
                target="_blank"
            >
              {{$t('home.starttoUse')}}!
            </a>
          </div>
        </div>
        <div class="title">How is VX distributed?</div>
        <div class="content">
          <p>Since the VX mining function went live on September 9, we are still gathering data for how best to implement VX distribution. Currently, we are releasing ​10,000​ VX every day with the following allocation for each mining method:</p>
          <div class="paragraph">
            <div class="bold">Trading, Referring and Listing</div>
            <div>60% of VX released daily will be distributed to traders who mine within this category. There are currently four markets: BTC, ETH, VITE and USDT. Each market will account for 15% of the daily VX distribution.</div>
          </div>
          <div class="paragraph">
            <div class="bold">Staking</div>
            <div>20% of VX released daily will be distributed to users who mine within this category.</div>
          </div>
          <div class="paragraph">
            <div class="bold">Market-Making</div>
            <div>10% of VX released daily will be distributed to traders who create orders.</div>
          </div>
          <p>The remaining 10% goes towards the ​<span class="bold">ViteX Reserve.</span></p>
          <div class="piechart">
            <img :src="piechart[page][$i18n.locale]" width="70%" height="70%">
          </div>
        </div>
        <div class="title">VX Release Schedule</div>
        <div class="content">
          <p class="bold">**Note: this release schedule is subject to change**</p>
          <p><span class="bold">Total supply​: </span>100,000,000 VX</p>
          <div class="paragraph">
            <div class="bold">Dual Phase VX Release Model</div>
            <div>After the official launch of VX mining, there will be two phases of VX release with the total supply set to 100,000,000 with no inflation.</div>
          </div>
          <p><span class="bold">Phase 1:​ </span>For the first one or two months, 10,000 VX will be released daily (“Buffer Phase”). Once the ViteX team believes enough users have joined the platform, the second phase will start.</p>
          <p><span class="bold">Phase 2:​ </span>During the first year of this phase, the number of VX released per day will decrease by 0.5% daily. 477,032 VX will be released on the first day. According to this formula, 80.13% of the total supply of VX will be released in the first year. In the second year, the number of VX released will decrease by 0.2% daily. 37,051 VX will be released on the final day of the second year.</p>
          <div class="piechart" v-if="page === 'mine'">
            <img :src="piechart.release" width="70%" height="70%">
          </div>
        </div>
        <div class="title">More questions?</div>
        <div class="content">
          <p>Join our Telegram community: ​<a href="https://t.me/vitexexchange" target="_blank">https://t.me/vitexexchange</a></p>
          <p>Check out the ViteX Official Website: ​<a href="https://vitex.net/" target="_blank">https://vitex.net/</a></p>
          <p>Start trading at: ​<a href="https://x.vite.net" target="_blank">https://x.vite.net</a></p>
        </div>
      </div>
    </div>

    <div class="question" v-else>
      <div class="answer" v-for="(item, index) in $t(`vitexInfo.questions.${page}`)" :key="index" >
        <div class="title is-flex"><span class="dot"></span>{{`${item.question}`}}</div>
        <div class="content" :class="{'answer-en': $i18n.locale !== 'zh'}">
          <p v-for="(ansItem, index) in item.answer" :key="index">{{ ansItem }}</p>
        </div>
      </div>
      <div class="main-btn">
        <a
            :href="piechart.urls.vitex[$i18n.locale]"
            class="text-white"
            target="_blank"
        >
          {{$t('home.starttoUse')}}!
        </a>
      </div>
      <div class="piechart" v-if="page === 'mine'">
        <img :src="piechart[page][$i18n.locale]" width="50%" height="50%">
        <img :src="piechart['dividend'][$i18n.locale]" width="50%" height="50%">
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import config from '~/config';
  import dividend_en from '~/assets/images/index/dividend_en.jpg';
  import dividend_zh from '~/assets/images/index/dividend_zh.jpg';
  import mine_en from '~/assets/images/index/mine_en.jpg';
  import mine_zh from '~/assets/images/index/mine_zh.jpg';
  import release from '~/assets/images/index/release.png';

  export default {
    props: {
      page: {
        type: String,
        default: ''
      }
    },
    computed: {
      piechart() {
        return {
          'dividend': {
            en: dividend_en,
            zh: dividend_zh,
          },
          'mine': {
            en: mine_en,
            zh: mine_zh,
          },
          release,
          urls: config.urls
        };
      }
    },
    data() {
      return {
      };
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~assets/vars";
  .text-white{
    color: white;
  }

  .bold{
    font-weight: bold;
    color: #000;
  }
  .paragraph{
    margin: 1em 0;
  }

  .detail{
    @include touch{
      display: block;
      margin: 0 20px;
    }
    .title{
      margin-bottom: 20px;
      color:#171C34;
      font-size: 20px;
      align-items: center;
      .dot {
        display: inline-block;
        width:6px;
        height:6px;
        background:rgba(47,91,234,1);
        border-radius:6px;
        margin-right: 7px;
        vertical-align: top;
      }
    }
    .content{
      margin-bottom: 20px;
      color:$text-color;
      font-size: 14px;
      line-height: 20px;
    }
    .piechart{
      justify-content: center;
      margin: 30px 0;
      
    }
  }
</style>