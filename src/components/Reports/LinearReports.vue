<template>
    <GChart
    :settings="{ packages: ['line'] }"
    :data="data"
    :options="options"
    :createChart="(el, google) => new google.charts.Line(el)"
    @ready="onChartReady"
    />
</template>

<script>

import { GChart } from 'vue-google-charts'

export default {
    name: 'LinearReports',
    data: () => ({
        type : 'LinearChart',
        chartsLib: null,
        
        data :  [
            ["Mes", "Cantidad de oportunidades"],
            ['agosto', 2],
            ['septiembre', 1],
            ['octubre', 3],
        ],
        
        options : {
            vAxis: {
                title: 'Numero de oportunidades',
                logScale: false,
            },
            hAxis: {
                title: 'Mes',
                logScale: true
            },
            height: 300,
            colors: ["#d95f02"],
            legend: { position: "none" },
            trendlines: {
                1: {
                    type: "linear",
                    color: "green",
                },
            },
        }
    }),
    methods: {
        onChartReady(chart, google) {
        this.chartsLib = google;
        },
    },
    components: {
        GChart,
    },

}
</script>

<style>

</style>