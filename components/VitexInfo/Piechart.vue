<template>
  <div class="detail">
    <div class="question-en" v-if="page === 'mine' && $i18n.locale === 'en'">
      <div class="answer">
        <div class="title">What is ViteX?</div>
        <div class="content">
          <p>ViteX, developed by Vite Labs, is the world's first decentralized exchange built on DAG technology. ViteX Coin, VX, is the coin native to the ViteX platform. It is mined exclusively by the ViteX community and is used to allocate rewards back to the community.</p>
          <div class="referral" v-show="type === 'referral'">
            <p>Use referral code <span class="num-blue">2279987214</span> to get 10% off all trading fees! </p>
            <p>For more details on how to use a referral code, refer to this article <a href="https://forum.vite.net/topic/2377/how-to-referring-as-mining-on-vitex" target="_blank">​here​</a></p>
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
        </div>
        <div class="title">What can I do with VX?</div>
        <div class="content">
          <ol>
            <li>You can ​trade ​it on ViteX with the following trading pairs: VX/BTC, VX/ETH, VX/USDT, and VX/VITE</li>
            <li>Even better, you can “hodl” it to receive daily dividends in BTC, ETH, and USDT (wrapped on the Vite chain). Trading fees collected by ViteX are put into a shared dividend pool that is distributed ​back​ to traders at a daily rate of 1%. All accounts staking at least 10 VX in the exchange are eligible to receive dividends. More details on dividends can be found   
            <nuxt-link :to="localePath('dividend')">here</nuxt-link>​.
            </li>
          </ol>
          <p>Sound interesting? Sign up for a trading account now at <a href="https://x.vite.net/​" target="_blank">​https://x.vite.net/​</a>!</p>
        </div>
        <div class="title">How do I mine VX? </div>
        <div class="content">
          <p>Mining on ViteX is easy - No ASICs or complicated server setup is required.</p>
          <ol>
            <li><span class="bold">Trading as Mining. </span> 
              Each time a trade is executed (i.e. an order is taken off the order book), the trader will be rewarded with VX. The amount of VX rewarded varies daily and is determined by the proportion of fees charged to the trader against the total amount of trading fees collected by ViteX that particular day.
            </li>
            <li><span class="bold">Referring as Mining. ​</span> 
              Every trader will receive a referral code that they can share with their friends. Each new trader who signs up with the referral code will get 10% off of all trading fees on ViteX indefinitely, an additional 2.5% mining rewards on trading, and an additional 1.25% on market making. Traders that make a successful referral will be rewarded with 5% of the referred friend’s trading-as-mining proceeds, and 2.5% of their market-making-as-mining proceeds.
            </li>
            <li><span class="bold">Listing as Mining. </span> ​List new trading pairs to mine VX. A user (“token issuer” or an “operator”) that lists a new trading pair will also receive VX. The token issuer’s reward is calculated as if he/she executed a trade involving a transaction fee of 1,000 VITE.</li>
            <li><span class="bold">Staking as Mining. </span> ​
              Vite’s public chain requires quota to properly allocate its computing resources. Quota is obtained by staking VITE. If a user stakes VITE to help ViteX obtain the quota it needs to operate, they will be rewarded with VX.
            </li>
            <li><span class="bold">Market-making as Mining.​ </span> 
              Market-making refers to placing orders on ViteX to boost liquidity on the platform. Even without an order execution, traders will be rewarded with VX. If and when the order is executed, users will receive trading-as-mining rewards. See the <strong>"Trading as Mining"</strong> section above for additional details.
            </li>
          </ol>
          <p>You can find each mining method described in more detail <a href="https://docs.vite.org/vite-docs/dex/#mining-allocation" target="_blank">here</a>​​.</p>
          <div class="main-btn">
            <a
                :href="piechart.urls.vitex[$i18n.locale]"
                class="text-white"
                target="_blank"
            >
              {{$t('home.startMining')}}!
            </a>
          </div>
        </div>
        <div class="title">How is VX distributed?</div>
        <div class="content">
          <p>A total VX supply of 29,328,807.8 will be fully released in 8 years. The release of VX starts from 10,000 on December 7, 2019, and continued to increase for 90 days, reaching 50,000 on March 6, 2020 (10,000 on December 7, and 50,000 on March 6, 2020). The daily release of VX begins to decline after March 6, 2020.
          </p>
          <div class="paragraph">
            <div class="bold">Trading, Referring and Listing</div>
            <div>55% of VX released daily will be distributed to traders who mine within this category. There are currently four markets: BTC, ETH, VITE and USDT. Each market will account for 13.75% of the daily VX distribution.</div>
          </div>
          <div class="paragraph">
            <div class="bold">Staking</div>
            <div>20% of VX released daily will be distributed to users who mine within this category.</div>
          </div>
          <div class="paragraph">
            <div class="bold">Market-Making</div>
            <div>15% of VX released daily will be distributed to traders who create orders.</div>
          </div>
          <p>The remaining 10% goes towards the ​<span class="bold">ViteX Reserve.</span></p>
          <div class="piechart">
            <img :src="piechart[page][$i18n.locale]" width="70%" height="70%">
          </div>
        </div>
        <div class="title">VX Release Schedule</div>
        <div class="content">
          <!-- <p class="bold">**Note: this release schedule is subject to change**</p> -->
          <!-- <p><span class="bold">Total supply​: </span>29328807.8 VX</p> -->
          <div class="paragraph">
            <div class="bold">Dual Phase VX Release Model</div>
            <div>After the official launch of VX mining, there will be two phases of VX release with the total supply set to 29328807.8 VX with no inflation.</div>
          </div>
          <p><span class="bold">Phase 1:​  </span> 
            10,000 VX daily release amount for the first 88 days.</p>
          <p><span class="bold">Phase 2:​  </span>
            After Phase 1, the daily release amount gradually increases for 90 days, peaking at 50,000 VX. From that point on, the daily release amount decreases untill all VX tokens are in circulation for 8 years.
          </p>
          <div class="piechart" v-if="page === 'mine'">
            <emission-chart class="emission-chart"></emission-chart>
          </div>
        </div>
        <div class="title">More questions?</div>
        <div class="content">
          <p>Join our Telegram community: ​<a href="https://t.me/vitexexchange" target="_blank">https://t.me/vitexexchange</a></p>
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

      <div class="piechart" v-if="page === 'mine'">
        <img :src="piechart[page][$i18n.locale]" width="50%" height="50%">
        <img :src="piechart['dividend'][$i18n.locale]" width="50%" height="50%">
      </div>

      <div class="main-btn">
        <a :href="piechart.urls.vitex[$i18n.locale]" class="text-white" target="_blank">
          {{$t('home.starttoUse')}}!
        </a>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
  import config from '~/config';
  import EmissionChart from "~/components/LandingDashbord/emissionChart";

  import mine_en from '~/assets/images/release_en.png';
  import mine_zh from '~/assets/images/release_zh.png';
  import release from '~/assets/images/index/release.png';
  import dividend_zh from '~/assets/images/vx_curve_zh.png';
  import dividend_en from '~/assets/images/vx_curve_en.png';

  export default {
    components: { EmissionChart },
    props: {
      page: {
        type: String,
        default: ''
      },
      type: {
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
          urls: config.urls,
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
  .num-blue{
    color: $light-blue;
    font-size: 2em;
    font-weight: bold;
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
    .referral{
      font-size: 16px;
      color: #171C34;
      border-radius: 10px;
      border: 3px dotted #007AFF;
      max-width: 600px;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    .piechart{
      justify-content: center;
      margin: 30px 0;
      
    }
  }

.vx-curve {
  display: block;
  margin: 0 auto 30px;
  width: 580px;
}

.emission-chart {
  height: 250px;
}
</style>
