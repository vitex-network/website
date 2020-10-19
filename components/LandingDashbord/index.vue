<template>
    <div class="landing-dashbord">
        <div class="col">
            <div class="market-col">
                <div class="header-info">
                    <div>
                        <img src="~/assets/images/index/cmc.png" alt="">
                        <img src="~/assets/images/index/cg.png" alt="">
                    </div>
                </div>
                <div class="market-item header">
                    <div>{{$t('marketTable.header.txPair')}}</div>
                    <div>{{$t('marketTable.header.closePrice')}}</div>
                    <div>{{$t('marketTable.header.change')}}</div>
                </div>
                <a class="market-item" v-for="item in markets" :key="item.symbol" :href="`https://x.vite.net/trade?symbol=${item.symbol}`" target="_blank">
                    <div>{{item.symbol}}</div>
                    <div> <strong>{{item.closePrice}}</strong> {{item.quoteTokenSymbol}}</div>
                    <div class="item-percent" :class="{'is-up': Number(item.priceChangePercent) > 0, 'is-down': Number(item.priceChangePercent) < 0 }">
                        <strong>{{item.priceChangePercent | percent}}</strong>
                    </div>
                </a>
                <a href="https://x.vite.net/trade" class="market-item" target="_blank" key="another">
                    {{$t('indexPage.landingDashbord.more')}}
                </a>
            </div>
        </div>
        <div class="col">
            <div class="reward-col">
                <h2>{{$t('indexPage.landingDashbord.title')}}</h2>
                <div class="sub-title"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        markets() {
            return this.$store.state.exchangeMarket.landingMarkets;
        },
        setMineInfo() {
            return this.$store.state.mine.setMineInfo;
        }
    }
}
</script>

<style lang="scss" scoped>
$landing-border-radius: 5px;

.landing-dashbord {
    display: flex;
    flex-direction: row;
    top: -120px;
    position: absolute;
    width: 100%;
    margin: 0 -15px;
    & > div {
        flex: 1;
    }
}
.col {
    display: flex;
    flex-direction: column;
    padding: 0 15px;
}

.market-col {
    box-shadow: 0px 2px 9px 0px rgba(0,0,0,0.07);
    position: relative;
    border-bottom-left-radius: $landing-border-radius;
    border-bottom-right-radius: $landing-border-radius;
    .market-item {
        display: flex;
        flex-direction: row;
        padding-left: 12px;
        padding-right: 12px;
        border-bottom: 1px solid rgba(0,0,0,0.05);
        height: 60px;
        font-size: 14px;
        align-items: center;
        justify-content: space-between;
        color: #54565A;
        background-color: white;
        &:last-child {
            border-bottom: none;
            border-bottom-right-radius: $landing-border-radius;
            border-bottom-left-radius: $landing-border-radius;
            justify-content: center;
            color: #2F5BEA;
            font-weight: 600;
        }
        & > div {
            &:nth-child(1) {
                width: 40%;
            }
            &:nth-child(2) {
                width: 40%;
            }
            &:nth-child(3) {
                width: 110px;
            }
        }
        &.header {
            color: #7E8085;
            font-size: 12px;
            border-top-right-radius: $landing-border-radius;
        }
        .is-up {
            strong {
                color: #00D764;
            }
        }
        .is-down {
            strong {
                color: red;
            }
        }
        strong {
            font-weight: 600;
        }
    }
    .header-info {
        position: absolute;
        top: -28px;
        height: 30px;
        width: 100%;
        display: flex;
        flex-direction: row;
        & > div {
            background-color: white;
            padding: 7px 12px;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }
        img {
            height: 16px;
        }
    }
}

.reward-col {
    padding: 20px;
}

</style>