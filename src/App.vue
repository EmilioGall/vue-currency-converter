<script>
// Import Axios
import axios from 'axios';

// Import components
import CurrencyInput from './components/CurrencyInput.vue';
import CurrencyChart from './components/CurrencyChart.vue';

export default {

  // Register imported components for use in the template
  components: {

    CurrencyInput,
    CurrencyChart,

  },

  // Define the data properties for this component
  data() {
    return {

      currenciesKeys: [], // Arrays to hold currency codes
      currenciesValues: [], // Arrays to hold currency names
      amount1: 0, // First currency amount
      amount2: 0, // Second currency amount
      debouncedUpdateAmount1: null, // Store the debounced function for amount1
      debouncedUpdateAmount2: null, // Store the debounced function for amount2
      selectedCurrency1: 'EUR', // Default selected first currencies
      selectedCurrency2: 'USD', // Default selected second currencies
      conversionRate: 0, // Default conversion rate from selectedCurrency1 to selectedCurrency2

    };
  },

  // Lifecycle hook that runs when the component is created
  async created() {

    // Fetch the list of available currencies from the API
    await this.fetchCurrencies();

    // Fetch the conversion rate for the default selected currencies
    await this.fetchConvertionRate(this.selectedCurrency1, this.selectedCurrency2);

    // Create debounced versions of the update methods
    this.debouncedUpdateAmount1 = this.debounce(this.updateAmount1, 500);
    this.debouncedUpdateAmount2 = this.debounce(this.updateAmount2, 500);

  },

  // Methods for the component's functionality
  methods: {

    // Method to fetch available currencies from the API
    async fetchCurrencies() {

      // Send a GET request to fetch the supported currencies
      const response = await axios.get('https://api.frankfurter.app/currencies');

      // console.log('response', response.data);

      // Store the currency codes in [currenciesKeys] and currency names in [currenciesValues]
      this.currenciesKeys = Object.keys(response.data);
      this.currenciesValues = Object.values(response.data);

    },

    // Method to fetch the conversion rate between two currencies
    async fetchConvertionRate(curFrom, curTo) {

      // Send a GET request to fetch the conversion rate for the selected currencies
      const response = await axios.get(`https://api.frankfurter.app/latest?base=${curFrom}&symbols=${curTo}`);

      // console.log('response', response);

      // Store the conversion rate in the component's data [conversionRate]
      this.conversionRate = response.data.rates[curTo];

      console.log('conversionRate =', this.conversionRate, typeof this.conversionRate);

    },

    // Method to update [amount1] and corresponding [amount2] when the first input changes
    updateAmount1(amount) {

      // Update the [amount1] with the new value
      this.amount1 = Number(amount);

      // Calculate and update [amount2] based on the current conversion rate
      this.amount2 = Number((this.amount1 * this.conversionRate).toFixed(2));

    },

    // Method to update [amount2] and corresponding [amount1] when the second input changes
    updateAmount2(amount) {

      // Update the [amount2] with the new value
      this.amount2 = Number(amount);

      // Calculate and update [amount1] based on the current conversion rate
      this.amount1 = Number((this.amount2 / this.conversionRate).toFixed(2));

    },

    // Method to update [selectedCurrency1] and fetch the new conversion rate
    async updateCurrency1(currency) {

      // Update [selectedCurrency1] with the newly selected currency
      this.selectedCurrency1 = currency;

      // Fetch the conversion rate for the new currency selection
      await this.fetchConvertionRate(this.selectedCurrency1, this.selectedCurrency2);

      // Calculate and update [amount1] based on the current conversion rate
      this.updateAmount1(this.amount1);

    },

    // Method to update [selectedCurrency2] and fetch the new conversion rate
    async updateCurrency2(currency) {

      // Update [selectedCurrency1] with the newly selected currency
      this.selectedCurrency2 = currency;

      // Fetch the conversion rate for the new currency selection
      await this.fetchConvertionRate(this.selectedCurrency1, this.selectedCurrency2);

      // Calculate and update [amount2] based on the current conversion rate
      this.updateAmount2(this.amount2);

    },

    switchCurrencies() {

      const tmpCurrency = this.selectedCurrency2;

      this.selectedCurrency2 = this.selectedCurrency1;

      this.selectedCurrency1 = tmpCurrency;

      if (this.selectedCurrency1 !== this.selectedCurrency2) {

        this.fetchConvertionRate(this.selectedCurrency1, this.selectedCurrency2);

      } else {

        console.warn("Cannot fetch rates for the same currency");

      };

    },

    debounce(functionToCall, waitTime) {

      // Define variable for timeout
      let timeout;

      return function (...args) { // capture arguments passed to the debounced function

        // Clear the previous timer
        clearTimeout(timeout);

        // Capture context of function
        const context = this;

        timeout = setTimeout(() => {

          // Execute the function with the correct context
          functionToCall.apply(context, args);

        }, waitTime);

      };

    },

  },

}

</script>

<template>

  <main class="container g-2 p-5">

    <div class="row justify-content-between g-2 py-3 px-5 border rounded-4 bg-custom shadow-lg">

      <h1 class="fs-1 text-center text-white">CURRENCY CONVERTER</h1>

      <div class="col-3 d-flex flex-column">

        <span class="fs-5 text-white">1,00 {{ selectedCurrency1 }} è uguale a</span>

        <span class="fs-2 text-white">{{ conversionRate + ' ' + selectedCurrency2 }}</span>

      </div>

      <div class="col-8">

        <div class="container-fluid">

          <div class="row">

            <div class="col-1 d-flex">

              <button class="btn btn-outline-light" @click="switchCurrencies" id="switch">

                <i class="fa-solid fa-repeat"></i>

              </button>

            </div>

            <div class="col-11 d-flex flex-column gap-2 pe-0">

              <!-- First Input Group for the first currency -->
              <CurrencyInput :currenciesKeys="currenciesKeys" :currenciesValues="currenciesValues"
                :selectedCurrency="selectedCurrency1" v-model:inputAmount="amount1"
                @input-change="debouncedUpdateAmount1" @currency-change="updateCurrency1"
                :disabledCurrencies="[selectedCurrency2]" />
              <!-- /First Input Group -->

              <!-- Second Input Group for the second currency -->
              <CurrencyInput :currenciesKeys="currenciesKeys" :currenciesValues="currenciesValues"
                :selectedCurrency="selectedCurrency2" v-model:inputAmount="amount2"
                @input-change="debouncedUpdateAmount2" @currency-change="updateCurrency2"
                :disabledCurrencies="[selectedCurrency1]" />
              <!-- /Second Input Group -->
            </div>

          </div>

        </div>

      </div>

      <div class="col-12 mt-3">

        <CurrencyChart :selectedCurrency1="selectedCurrency1" :selectedCurrency2="selectedCurrency2" />

      </div>

    </div>

  </main>

</template>

<style scoped lang="scss">
.bg-custom {

  background-color: #1E88E5;
  /* Blu intenso */

}
</style>
