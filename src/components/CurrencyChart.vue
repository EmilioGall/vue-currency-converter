<script>
// Import Axios
import axios from 'axios';

export default {

   // Define the props that can be passed to this component
   props: {

      selectedCurrency1: String, // First currency selected for conversion
      selectedCurrency2: String, // Second currency selected for conversion

   },

   data() {
      return {

         currencyFrom: this.selectedCurrency1, // Currency from which we are converting
         currencyTo: this.selectedCurrency2, // Currency to which we are converting
         dates: [], // Arrays to hold dates informations
         changeRates: [], // Arrays to hold change rates informations
         dateTo: new Intl.DateTimeFormat('en-CA').format(new Date()), // Current date formatted
         monthsAgo: 1, // Initial month offset for historical data

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
               toolbar: {
                  show: true, // Show toolbar
               },
               zoom: {
                  enabled: true, // Enable zooming functionality
               },
               animations: {
                  enabled: true, // Enable animations
                  easing: 'easeinout', // Easing function for animations
                  speed: 800, // Speed of the animations in milliseconds
               }

            },

            title: {

               text: 'Exchange rate hystory', // Default title for the chart
               align: 'left', // Alignment of the title
               
            },

            xaxis: {

               type: 'datetime',

            },

            yaxis: {

               title: {
                  text: 'Values', // Title for the y-axis
               },

            },

            tooltip: {

               theme: 'dark',
               style: {
                  fontSize: '12px',
                  background: '#424242',
                  color: '#ffffff'
               },
               shared: false, // Tooltip configuration
               intersect: true, // Make tooltips appear even if only one series is hovered

            },

            dataLabels: {

               enabled: false, // Disable data labels on points
               style: {
                  colors: ['#fff'], // Colors for data labels
               },
               formatter: function (val) {
                  return val; // Show the value as a label
               },

            },

            markers: {

               size: 3, // Size of the markers (circles)
               colors: ['#fff'], // Color of the markers
               strokeColor: ['#1d2b64'], // Color of the marker borders
               strokeWidth: 1, // Width of the marker borders
               hover: {
                  size: 5, // Size of markers when hovered
               }

            },

            colors: ['#1d2b64'], // Primary color for the line

            grid: {

               borderColor: ['#ffffff'], // Color of the grid lines (background)

            },

            stroke: {

               curve: 'straight', // Line curve type
               width: 2, // Stroke width of the line

            },

            background: ['#ffffff'], // Background color for the chart

         },

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

            // Calculate the date from [monthsAgo] and format it
            const dateFrom = new Intl.DateTimeFormat('en-CA').format(this.getXMonthsAgo(this.monthsAgo));

            // Send a GET request to fetch exchange rates for the specified date
            const response = await axios.get(`https://api.frankfurter.app/${dateFrom}..${this.dateTo}?base=${this.currencyFrom}&symbols=${this.currencyTo}`);

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

         // Clear previous rates for fresh data
         this.changeRates = [];

         // Update the exchange rates from the API response
         this.changeRates = Object.values(rates).map(rate => rate[this.currencyTo]);

         // Update the chart data with the newly fetched rates
         this.updateChartData();

      },

      // Method to update chart data and x-axis categories
      updateChartData() {

         // Populate the series data for the chart
         this.series[0].data = this.changeRates.map((rate, index) => ({

            x: new Date(this.dates[index]), // Using JavaScript Date object, convert date string to Date object
            y: rate.toFixed(4), // Corresponding rate

         }));

      },

      // Method to get the date 'x' months ago
      getXMonthsAgo(x) {

         const date = new Date();

         // Subtract 'x' months from the current month
         date.setMonth(date.getMonth() - x);

         return date;

      },

      // Method to set a new time span and fetch rates
      setNewTime(monthsAgo) {

         this.monthsAgo = monthsAgo; // Update monthsAgo value

         // console.log('this.monthsAgo =', this.monthsAgo);

         // Fetch updated rates based on new time span
         this.fetchRatesHistory();

      },

   },

   // Watchers to react to changes in props
   watch: {

      // Watch for changes in the [selectedCurrency1 prop] 
      selectedCurrency1(newCurrency) {

         // Update currencyFrom when [selectedCurrency1 prop] changes
         this.currencyFrom = newCurrency;

         // Fetch updated rates history based on the new currency
         if (this.currencyFrom !== this.currencyTo) {
            this.fetchRatesHistory();
         }

      },

      // Watch for changes in the [selectedCurrency2 prop] 
      selectedCurrency2(newCurrency) {

         // Update currencyTo when selectedCurrency2 prop changes
         this.currencyTo = newCurrency;

         // Fetch updated rates history based on the new currency
         if (this.currencyFrom !== this.currencyTo) {
            this.fetchRatesHistory();
         }

      },

   }

}
</script>

<template>

   <!-- Line Chart -->
   <apexchart class="px-5 py-3 bg-light rounded bg-opacity-75" type="line" :options="chartOptions" :series="series"></apexchart>
   <!-- /Line Chart -->

   <!-- Dropdown TimeSpan Select -->
   <select class="form-select btn btn-light mt-3" aria-label="TimeSpan Select"
      @change="setNewTime($event.target.value)">

      <option value="1" selected>Last Month</option>
      <option value="3">Last Trimester</option>
      <option value="6">Last Semester</option>
      <option value="12">Last Year</option>
      <option value="60">Last 5 Years</option>

   </select>
   <!-- /Dropdown TimeSpan Select -->

</template>

<style scoped lang="scss">
/* Optional additional styles for the dropdown */
.form-select {
   background-color: #ffffff;
}
</style>