<script>
export default {

   props: {

      currenciesKeys: Array,
      currenciesValues: Array,
      inputAmount: Number,
      selectedCurrency: String,
      disabledCurrencies: Array,
   },

   data() {
      return {

         amount: this.inputAmount,
         selectedCurrencyValue: this.selectedCurrency,
      };
   },

   methods: {

      updateAmount() {

         this.$emit('input-change', this.amount);

      },

      updateCurrency() {

         this.$emit('currency-change', this.selectedCurrencyValue);

      },

   },

   watch: {

      inputAmount(newValue) {

         this.amount = newValue;

      },

      selectedCurrency(newValue) {

         this.selectedCurrencyValue = newValue;

      },

   }

}
</script>

<template>

   <div class="input-group col-2">

      <input class="input-group-text" type="number" v-model="amount" @input="updateAmount">

      <select class="form-select btn btn-outline-light" v-model="selectedCurrencyValue" @change="updateCurrency">

         <option v-for="(currency, i) in currenciesKeys" :key="currency" :value="currency"
            :disabled="disabledCurrencies.includes(currency)">
            {{ `${currenciesValues[i]} (${currency})` }}
         </option>

      </select>

   </div>

</template>

<style scoped lang="scss"></style>