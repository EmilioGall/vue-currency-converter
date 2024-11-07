<script>
// Import Axios
import axios from 'axios';

// Import components
import CurrencyInput from './components/CurrencyInput.vue';
import CurrencyChart from './components/CurrencyChart.vue';

export default {

  components: {

    CurrencyInput,
    CurrencyChart,

  },

  data() {
    return {

      currenciesKeys: [],
      currenciesValues: [],
      amount1: 0,
      amount2: 0,
      selectedCurrency1: 'EUR',
      selectedCurrency2: 'USD',
      conversionRate: 0,

    };
  },

  async created() {

    await this.fetchCurrencies();

    await this.fetchConvertionRate(this.selectedCurrency1, this.selectedCurrency2);

  },

  methods: {

    async fetchCurrencies() {

      const response = await axios.get('https://api.frankfurter.app/currencies');

      // console.log('response', response.data);

      this.currenciesKeys = Object.keys(response.data);
      this.currenciesValues = Object.values(response.data);

    },

    async fetchConvertionRate(curFrom, curTo) {

      const response = await axios.get(`https://api.frankfurter.app/latest?base=${curFrom}&symbols=${curTo}`);

      // console.log('response', response);

      this.conversionRate = response.data.rates[curTo];

      console.log('conversionRate =', this.conversionRate, typeof this.conversionRate);

      this.amount2 = this.amount1 * this.conversionRate;

    },

    updateAmount1(amount) {

      this.amount1 = amount;

      console.log('amount1 =', this.amount1, typeof this.amount1);

      console.log('conversionRate =', this.conversionRate, typeof this.conversionRate);

      this.amount2 = (this.amount1 * this.conversionRate).toFixed(2);

      console.log('amount2 =', this.amount2, typeof this.amount2);

    },

    updateAmount2(amount) {

      this.amount2 = amount;

      this.amount1 = (this.amount2 / this.conversionRate).toFixed(2);

      console.log('amount2 =', this.amount2);

    },

    updateCurrency1(currency) {

      this.selectedCurrency1 = currency;

      console.log('selectedCurrency1 =', this.selectedCurrency1);

      this.fetchConvertionRate(this.selectedCurrency1, this.selectedCurrency2);

    },

    updateCurrency2(currency) {

      this.selectedCurrency2 = currency;

      console.log('selectedCurrency2 =', this.selectedCurrency2);

      this.fetchConvertionRate(this.selectedCurrency1, this.selectedCurrency2);

    },

  },

}

</script>

<template>

  <main class="container g-2 p-5">

    <div class="row g-2 py-3 px-5 border rounded-5">

      <h1 class="fs-1 text-center text-white">CURRENCY CONVERTER</h1>

      <span class="fs-5 text-white">1,00 {{ selectedCurrency1 }} è uguale a</span>

      <span class="fs-2 text-white">{{ conversionRate + ' ' + selectedCurrency2 }}</span>

      <!-- First Input Group -->
      <CurrencyInput class="col" :currenciesKeys="currenciesKeys" :currenciesValues="currenciesValues"
        :selectedCurrency="selectedCurrency1" v-model:inputAmount="amount1" @input-change="updateAmount1"
        @currency-change="updateCurrency1" :disabledCurrencies="[selectedCurrency2]" />
      <!-- /First Input Group -->

      <!-- Second Input Group -->
      <CurrencyInput class="col" :currenciesKeys="currenciesKeys" :currenciesValues="currenciesValues"
        :selectedCurrency="selectedCurrency2" v-model:inputAmount="amount2" @input-change="updateAmount2"
        @currency-change="updateCurrency2" :disabledCurrencies="[selectedCurrency1]" />
      <!-- /Second Input Group -->

      <div class="col border rounded-2">
  
        <CurrencyChart :selectedCurrency1="selectedCurrency1" :selectedCurrency2="selectedCurrency2"/>
  
      </div>

    </div>

  </main>

</template>

<style scoped lang="scss"></style>
