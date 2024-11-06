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

      currencies: [],
      amount1: 0,
      amount2: 0,
      currency1: 'EUR',
      currency2: 'USD',

    };
  },

  async created() {

    await this.fetchCurrencies();

  },

  methods: {

    async fetchCurrencies() {

      const response = await axios.get('https://api.frankfurter.app/currencies');

      // console.log('response', response.data);

      this.currencies = Object.keys(response.data);
      this.currency1 = 'EUR';
      this.currency2 = 'USD';

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
      <CurrencyInput :currencies="currencies" />
      <!-- /First Input Group -->

      <!-- Second Input Group -->
      <CurrencyInput :currencies="currencies" />
      <!-- /Second Input Group -->

    </div>

  </main>

</template>

<style scoped lang="scss"></style>
