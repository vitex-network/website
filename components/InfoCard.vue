<template>
    <div>
        <div class="columns is-multiline">
            <div class="column is-3-desktop is-6-tablet is-12-mobile" v-for="(item, index) in list" :key="index">
                <div>{{ item.tokenSymbol }}  {{ item.vxAmount }} VX</div>
                <div>实时交易手续费</div>
                <div>{{ item.tokenAmount }} {{ item.tokenSymbol }}</div>
                <div>≈{{ item.btcAmount }} BTC</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      list: [{
        vxAmount: 71197.08,
        tokenAmount: 12345,
        tokenSymbol: 'VITE',
        btcAmount: 1
      }, {
        vxAmount: 71197.08,
        tokenAmount: 12345,
        tokenSymbol: 'VITE',
        btcAmount: 1 
      }, {
        vxAmount: 71197.08,
        tokenAmount: 12345,
        tokenSymbol: 'VITE',
        btcAmount: 1 
      }, {
        vxAmount: 71197.08,
        tokenAmount: 12345,
        tokenSymbol: 'VITE',
        btcAmount: 1 
      }]
    };
  }
};
</script>
<style lang="scss" scoped>

</style>