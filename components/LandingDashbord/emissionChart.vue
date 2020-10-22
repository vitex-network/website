<template>
  <div>
    <line-chart
      class="line-chart"
      :chart-data="chartdata"
      :options="chartOptions"
    ></line-chart>
  </div>
</template>

<script>
import moment from "moment";
import LineChart from "./lineChart.vue";

const datasetConfig = {
  pointRadius: 0,
  fill: false,
  lineTension: 0,
  borderWidth: 2,
  label: "每日释放量",
  backgroundColor: "rgb(109,208,191)",
  borderColor: "rgb(109,208,191)",
  fill: "start",
};

export default {
  components: { LineChart },
  mounted() {
    this.getDataset();
  },
  data() {
    return {
      chartdata: {},
      chartOptions: {
        legend: {
            display: false
        },
        scales: {
          xAxes: [
            {
              type: "time",
              distribution: "series",
              offset: true,
              gridLines: {
                display: true,
                drawBorder: true,
                drawOnChartArea: false,
              },
              time: {
                unit: "day",
              },
              ticks: {
                major: {
                  enabled: true,
                  fontStyle: "bold",
                },
                source: "data",
                autoSkip: true,
                autoSkipPadding: 75,
                maxRotation: 0,
                sampleSize: 100,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                drawBorder: true,
                drawOnChartArea: true,
              },
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    getDataset() {
      const data = [];
      const startDay = moment("2019-09-10");
      let loop = true;
      let day = startDay;
      let rewardPerDay = 0;
      let supply = 0;
      const data2 = [];
      while (loop) {
        // 第一阶段: 每天 10000 vx
        if (day.isBefore(moment("2019-12-07"))) {
            rewardPerDay = 10000;
        } else if (day.isBefore(moment("2020-03-06"))) {
          rewardPerDay = rewardPerDay * 1.0180435;
        } else if (day.isSame(moment("2020-03-06"))) {
          rewardPerDay = 50000;
        } else {
          rewardPerDay = rewardPerDay * 0.99810276;
        }
        if (rewardPerDay < 1000) {
          loop = false;
        }
        supply += rewardPerDay;

        if (moment().isBefore(day)) {
          data2.push({
            t: day.valueOf(),
            y: rewardPerDay,
          });
        } else {
          data.push({
            t: day.valueOf(),
            y: rewardPerDay,
          });
        }

        day.add("1", "days");
      }
      this.chartdata = {
        datasets: [
          {
            ...datasetConfig,
            data,
          },
          {
            ...datasetConfig,
            fill: false,
            data: data2,
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.line-chart {
  height: 150px;
  position: relative;
  width: 100%;
}
</style>