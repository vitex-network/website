<template>
   <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      :formatter="formatter">
    </el-table-column>
  </el-table>
</template>

<script>
import BigNumber from '~/utils/bigNumber';

export default {
    props: {
        currentRule: {
            type: String,
            default: ''
        },
        list: {
            type: Array,
            default: () => []
        },
        showCol: {
            type: String,
            default: 'updown'
        }
    },
    data() {
        return {
            symbol: null,
            realPrice: '',
            top: 0,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        };
    },
    computed: {
        activeSymbol() {
            return this.activeTxPair ? this.activeTxPair.symbol || null : null;
        },
        activeTxPair() {
            return 'VITE';
            // return this.$store.state.exchangeActiveTxPair.activeTxPair;
        },
        showList() {
            const list = this.orderList(this.list);
            const query = getQuery();
            const symbol = query.symbol || 'VITE_BTC-000';

            const _l = [];
            let activeTxPair = list && list.length ? list[0] : null;

            list.forEach(_t => {
                if (symbol && _t.symbol === symbol) {
                    activeTxPair = _t;
                }
                _l.push(_t);
            });

            return _l;
        }
    },
    methods: {
        formatter(row, column) {
            return row.address;
        },
        getTxPairShowSymbol(txPair) {
            const tradeTokenSymbol = txPair.tradeTokenSymbol.split('-')[0];
            const quoteTokenSymbol = txPair.quoteTokenSymbol.split('-')[0];
            return `${ tradeTokenSymbol }/${ quoteTokenSymbol }`;
        },
        getPercent(num) {
            return `${ BigNumber.multi(num, 100, 2) }%`;
        },
        formatNum(num, fix) {
            return BigNumber.formatNum(num, fix);
        },
        getRealPrice(txPair) {
            if (!txPair) {
                return;
            }

            if (this.closeMarket.find(v => v.symbol === txPair.symbol)) {
                return this.$t('tradeCenter.marketClosed', { symbol: txPair.symbol });
            }

            const rate = this.getRate(txPair.quoteToken);
            if (!rate) {
                return txPair.tradeTokenSymbol;
            }

            const price = BigNumber.multi(txPair.closePrice || 0, rate || 0, 2);
            if (!+price) {
                return txPair.tradeTokenSymbol;
            }

            // const pre = this.$store.state.env.currency === 'cny' ? '≈¥' : '≈$';
            const pre = '≈¥';
            return `${ txPair.tradeTokenSymbol }  ${ pre }${ price }`;
        },
        getRate(tokenId) {
            // const rateList = this.$store.state.exchangeRate.rateMap || {};
            // const coin = this.$store.state.env.currency;

            const rateList =  {};
            const coin = '';

            if (!tokenId || !rateList[tokenId]) {
                return null;
            }

            return rateList[tokenId][`${ coin }Rate`] || null;
        },
        orderList(list) {
            const compareStr = (aStr, bStr) => {
                for (let i = 0; i < aStr.length; i++) {
                    if (!bStr[i]) {
                        return 1;
                    }

                    return aStr[i].charCodeAt() - bStr[i].charCodeAt();
                }

                return -1;
            };

            return list.sort((a, b) => {
                switch (this.currentRule) {
                case 'priceUp':
                    return BigNumber.compared(a.closePrice, b.closePrice);
                case 'priceDown':
                    return BigNumber.compared(b.closePrice, a.closePrice);
                case 'upDownUp':
                    return BigNumber.compared(a.priceChangePercent, b.priceChangePercent);
                case 'upDownDown':
                    return BigNumber.compared(b.priceChangePercent, a.priceChangePercent);
                case 'txNumUp':
                    return BigNumber.compared(a.amount, b.amount);
                case 'txNumDown':
                    return BigNumber.compared(b.amount, a.amount);
                default:
                    return compareStr(a.tradeTokenSymbol, b.tradeTokenSymbol);
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
