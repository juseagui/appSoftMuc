<template>
    <GChart
      type="ColumnChart"
      :data="data"
      :options="options"
      :resizeDebounce="400"
    />
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
    name: 'LinearReports',

    props: ['data'],
    data: () => ({
        type : 'ColumnChart',
        chartsLib: null,
      
        options : {
            chart: {
            title: "Company Performance",
            subtitle: "Sales, Expenses, and Profit: 2014-2017"
            },
            legend: { position: "none" },
        }
    }),
    components: {
        GChart,
    },

}
</script>

<style>

</style>