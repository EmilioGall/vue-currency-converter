<script>
import axios from 'axios';

export default {

   props: {

      selectedCurrency1: String,
      selectedCurrency2: String,

   },

   data() {
      return {

         currencyFrom: this.selectedCurrency1,
         currencyTo: this.selectedCurrency2,
         dates: [],
         changeRates: [],

         series: [{

            name: 'Exchange Rate',
            data: [],

         }],

         chartOptions: {

            chart: {
               type: 'line',
               height: 350,
            },

            title: {
               text: `Exchange rate ${this.selectedCurrency1}/${this.selectedCurrency2}`,
            },

            xaxis: {
               categories: [],
            }
         }

      };
   },

   async created() {

      await this.fetchRatesHistory(this.currencyFrom, this.currencyTo);

   },

   methods: {

      async fetchRatesHistory(curFrom, curTo) {

         const response = await axios.get(`https://api.frankfurter.app/2024-01-01..?base=${curFrom}&symbols=${curTo}`);

         // console.log('responceChart =', response.data.rates);

         const test = Object.keys(response.data.rates);

         this.dates = JSON.parse(JSON.stringify(test));

         console.log('dates =', this.dates);
         

         const changeRatesObj = Object.values(response.data.rates);

         this.changeRates = [];

         changeRatesObj.forEach((element, i) => {

            this.changeRates.push(element[curTo]);

         });

         // console.log('changeRates =', this.changeRates, typeof this.changeRates);

         this.updateChartY();

         this.updateChartX();

      },

      updateChartY() {

         this.series[0].data = [];

         this.changeRates.forEach(element => {

            this.series[0].data.push(element.toString());

         });

         // console.log('AsseY2 =', this.series[0].data, typeof this.series[0].data);

      },

      updateChartX() {

         this.chartOptions.xaxis.categories = [];

         this.dates.forEach(element => {

            // console.log('element', element, typeof element);
            
            this.chartOptions.xaxis.categories.push(element.toString());

         });

         console.log('AsseY1 =', this.chartOptions.xaxis.categories, typeof this.chartOptions.xaxis.categories);

      },

   },

   watch: {

      selectedCurrency1(newValue) {

         this.this.currencyFrom = newValue;

         this.fetchRatesHistory(this.currencyFrom, this.currencyTo);

      },

      selectedCurrency2() {

         this.this.currencyTo = newValue;

         this.fetchRatesHistory(this.currencyFrom, this.currencyTo);

      },

   }

}
</script>

<template>

   <div>

      <apexchart type="line" :options="chartOptions" :series="series"></apexchart>

   </div>

</template>

<style scoped lang="scss"></style>