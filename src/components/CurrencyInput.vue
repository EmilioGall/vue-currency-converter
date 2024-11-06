<script>
export default {

   props: {

      currenciesKeys: Array,
      currenciesValues: Array,
      inputAmount: Number,
      selectedCurrency: String,

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

}
</script>

<template>

   <div class="input-group col-2">

      <input class="btn btn-light" type="number" v-model="amount" @input="updateAmount">

      <select class="form-select btn btn-outline-light" v-model="selectedCurrencyValue" @change="updateCurrency">

         <option v-for="(currency, i) in currenciesKeys" :key="currency" :value="currency">
            {{ `${currenciesValues[i]} (${currency})` }}
         </option>

      </select>

   </div>

</template>

<style scoped lang="scss"></style>