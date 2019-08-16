<template>
    <div>
        <div class="market-table">
          <tab-list></tab-list>
          <vitex-input 
            class="market-search-input" 
            v-model="searchText"
            :placeholder="`请搜索`">
            <img slot="before" class="icon" src="~assets/images/search.svg"/>
          </vitex-input>
          <table-list></table-list>
        </div>
    </div>
</template>
<script>
import tableList from './tableList.vue';
import tabList from './tabList.vue';
import VitexInput from '../VitexInput.vue';
// import { client } from '~/utils/proto/wspb';
import { subTask } from '~/utils/proto/subTask';
let defaultPairTimer = null;

export default {
    components: {
        tableList,
        tabList,
        VitexInput
    },
    created() {
        if (process.server) {
          this.init();
        }
    },
    data() {
        return {
            searchText: '',
            quoteTokenCategory: 'BTC',
            txPairList: [],
            isLoading: false
        }
    },
    methods: {
        init() {
            console.log("aaaa");
            // console.log(this.$subTask);
            defaultPairTimer = defaultPairTimer || new subTask('defaultPair', ({ args, data }) => {
                console.log(data);
                if (args.quoteTokenCategory !== this.quoteTokenCategory) {
                    return;
                }

                this.isLoading = false;

                if (data instanceof Array) {
                    this.txPairList = data || [];
                    return;
                }

                if (!data) {
                    return;
                }

                // if (this.activeTxPair && data.symbol === this.activeTxPair.symbol) {
                //     this.$store.commit('exSetActiveTxPair', data);
                // }

                let i;
                for (i = 0; i < this.txPairList.length; i++) {
                    if (this.txPairList[i].symbol === data.symbol) {
                        this.txPairList[i] = data;
                        break;
                    }
                }

                if (i === this.txPairList.length) {
                    this.txPairList.push(data);
                    return;
                }

                this.txPairList = [].concat(this.txPairList);
            }, 2000);

            defaultPairTimer.start(() => {
                return { quoteTokenCategory: this.quoteTokenCategory };
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.market-search-input.input-wrapper {
    box-sizing: border-box;
    height: 20px;
    line-height: 20px;
    border: none;

    .icon {
        width: 12px;
        height: 12px;
        margin: 4px 6px 4px 6px;
    }

    input {
        text-indent: 0;
        font-weight: 400;
        font-size: 11px;
        background: rgba(245, 250, 255, 1);
    }
}



</style>