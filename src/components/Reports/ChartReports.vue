<template>
    <GChart :type="type" :data="data" :options="options" />
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
    name: 'ChartReports',
    data: () => ({
        type : 'PieChart',
        
        data : [
            ['Task', 'Hours per Day'],
            ['Work', 11],
            ['Eat', 2],
            ['Commute', 2],
            ['Watch TV', 2],
            ['Sleep', 7],
        ],
        
        options : {
            pieHole: 0.2,
            width: 600,
            height: 600,
        }

    }),
    components: {
        GChart,
    },

}
</script>

<style>

</style>