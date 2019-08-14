<template>
    <div>
        <div class="columns is-multiline">
          <div class="column item is-destop is-6" v-for="(item, index) in list" :key="index">
            <div>{{ item.title }}</div>
            <div>{{ item.value }} VX</div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [{
                title: '今日可挖量',
                value: 474647.20
                }, {
                title: '累计挖矿总量',
                value: 9654647.56
            }]
        }
    }
}
</script>
<style lang="scss" scoped>

</style>