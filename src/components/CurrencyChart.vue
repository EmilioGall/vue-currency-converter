<script>
import axios from 'axios';

export default {

   // Define the props that can be passed to this component
   props: {

      selectedCurrency1: String, // First currency selected for conversion
      selectedCurrency2: String, // Second currency selected for conversion

   },

   data() {
      return {

         // Initialize currencies with selected props
         currencyFrom: this.selectedCurrency1,
         currencyTo: this.selectedCurrency2,
         dates: [], // Arrays to hold dates informations
         changeRates: [], // Arrays to hold change rates informations

         // Series data for the chart
         series: [{

            name: 'Exchange Rate',  // Name for the series displayed in the chart legend
            data: [], // Data that will be populated with exchange rates

         }],

         // Chart options configuration
         chartOptions: {

            chart: {
               type: 'line', // Type of chart
               height: 350, // Height of the chart in pixels
            },

            title: {
               text: 'Exchange rate hystory', // Default title for the chart
            },

            xaxis: {
               categories: [], // Categories (dates) to be shown on the x-axis
            }

         }

      };

   },

   // Lifecycle hook that runs when the component is created
   created() {

      // Fetch the exchange rate history as soon as the component is created
      this.fetchRatesHistory();

   },

   // Methods for handling chart
   methods: {

      // Method to fetch historical exchange rates
      async fetchRatesHistory() {

         try {

            const date = '2024-01-01'; // Example static date for fetching rates

            // Send a GET request to fetch exchange rates for the specified date
            const response = await axios.get(`https://api.frankfurter.app/${date}..?base=${this.currencyFrom}&symbols=${this.currencyTo}`);

            // Process the response data
            this.processRateData(response.data.rates);

         } catch (error) {

            // Log error if fetching data fails
            console.error("Failed to fetch rates:", error);

         };

      },

      // Method to process the rates returned from the API
      processRateData(rates) {

         // Update the dates from the API response
         this.dates = Object.keys(rates);

         // Update the exchange rates from the API response
         this.changeRates = Object.values(rates).map(rate => rate[this.currencyTo]);

         // Update the chart data with the newly fetched rates
         this.updateChartData();

      },

      // Method to update chart data and x-axis categories
      updateChartData() {

         // Populate the series data for the chart
         this.series[0].data = this.changeRates.map(rate => rate.toString());

         // Update the x-axis categories with the dates
         this.chartOptions.xaxis.categories = this.dates.map(date => date.toString());

      },

   },

   // Watchers to react to changes in props
   watch: {

      // Watch for changes in the [selectedCurrency1 prop] 
      selectedCurrency1(newCurrency) {

         // Update currencyFrom when [selectedCurrency1 prop] changes
         this.currencyFrom = newCurrency;

         // Fetch updated rates history based on the new currency
         this.fetchRatesHistory();

      },

      // Watch for changes in the [selectedCurrency2 prop] 
      selectedCurrency2(newCurrency) {

         // Update currencyTo when selectedCurrency2 prop changes
         this.currencyTo = newCurrency;

         // Fetch updated rates history based on the new currency
         this.fetchRatesHistory();

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