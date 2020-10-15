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
                <div class="market-item" v-for="item in markets" :key="item.symbol">
                    <div>{{item.symbol}}</div>
                    <div> <strong>{{item.closePrice}}</strong> {{item.quoteTokenSymbol}}</div>
                    <div class="item-percent" :class="{'is-up': Number(item.priceChangePercent) > 0, 'is-down': Number(item.priceChangePercent) < 0 }">
                        <strong>{{item.priceChangePercent | percent}}</strong>
                    </div>
                </div>
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
        }
    }
    
}
</script>

<style lang="scss" scoped>
.landing-dashbord {
    display: flex;
    flex-direction: row;
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
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    & > div {
        display: flex;
        flex-direction: row;
    }
    .market-item {
        padding-left: 12px;
        padding-right: 12px;
        border-bottom: 1px solid rgba(0,0,0,0.05);
        height: 60px;
        font-size: 14px;
        align-items: center;
        justify-content: space-between;
        color: #54565A;
        &:nth-last-child() {
            border-bottom: none;
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
        }
        .is-up {
            color: #00D764;
        }
        .is-down {
            color: red;
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