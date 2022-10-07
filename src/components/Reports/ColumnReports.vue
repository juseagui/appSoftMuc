<template>
    <GChart
      type="ColumnChart"
      :data="data"
      :options="chartOptions"
      :resizeDebounce="400"
    />
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
    name: 'LinearReports',
    data: () => ({
        type : 'ColumnChart',
        chartsLib: null,
        
        data :   [
            ["Year", "Sales", "Expenses", "Profit"],
            ["2014", 1000, 400, 200],
            ["2015", 1170, 460, 250],
            ["2016", 660, 1120, 300],
            ["2017", 1030, 540, 350]
        ],
        
        options : {
            chart: {
            title: "Company Performance",
            subtitle: "Sales, Expenses, and Profit: 2014-2017"
            }
        }
    }),
    components: {
        GChart,
    },

}
</script>

<style>

</style>