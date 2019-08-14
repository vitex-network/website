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
import tabList from './tabList.vue'
import VitexInput from '../VitexInput.vue'

export default {
    components: {
        tableList,
        tabList,
        VitexInput
    },
    data() {
        return {
            searchText: ''
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