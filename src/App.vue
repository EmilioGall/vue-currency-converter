<script>
// Import Axios
import axios from 'axios';

// Import components
import CurrencyInput from './components/CurrencyInput.vue';

export default {

  components: {

    CurrencyInput,

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

      this.conversionRate = response.data.rates;

      console.log('conversionRate =', Object.values(this.conversionRate));

    },

    updateAmount1(amount) {

      this.amount1 = amount;

      console.log('amount1 =', this.amount1);

    },

    updateAmount2(amount) {

      this.amount2 = amount;

      console.log('amount2 =', this.amount2);

    },

    updateCurrency1(currency) {

      this.selectedCurrency1 = currency;

      console.log('selectedCurrency1 =', this.selectedCurrency1);

    },

    updateCurrency2(currency) {

      this.selectedCurrency2 = currency;

      console.log('selectedCurrency2 =', this.selectedCurrency2);

    },

  },

}

</script>

<template>

  <main class="container p-5">

    <div class="row g-2 py-3 px-5 border rounded-5">

      <h1 class="fs-1 text-center text-white">CURRENCY CONVERTER</h1>

      <span class="fs-5 text-white">1,00€ è uguale a</span>

      <span class="fs-2 text-white">0,95 CHF</span>

      <!-- First Input Group -->
      <CurrencyInput :currenciesKeys="currenciesKeys" :currenciesValues="currenciesValues"
        :selectedCurrency="selectedCurrency1" :inputAmount="amount1" @input-change="updateAmount1"
        @currency-change="updateCurrency1" />
      <!-- /First Input Group -->

      <!-- Second Input Group -->
      <CurrencyInput :currenciesKeys="currenciesKeys" :currenciesValues="currenciesValues"
        :selectedCurrency="selectedCurrency2" :inputAmount="amount2" @input-change="updateAmount2"
        @currency-change="updateCurrency2" />
      <!-- /Second Input Group -->

    </div>

  </main>

</template>

<style scoped lang="scss"></style>
