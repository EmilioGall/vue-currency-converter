<script>
export default {

   // Define the props that this component accepts from its parent
   props: {

      currenciesKeys: Array, // Array of currency codes
      currenciesValues: Array, // Array of currency names corresponding to the codes
      inputAmount: Number, // The amount to convert (initial value)
      selectedCurrency: String, // The currently selected currency
      disabledCurrencies: Array, // Array of currencies to disable in the selection

   },

   // Define the data properties for this component
   data() {
      return {

         amount: this.inputAmount, // Set initial amount to the [inputAmount prop]
         selectedCurrencyValue: this.selectedCurrency, // Set initial selected currency to the [selectedCurrency prop]
      };
   },

   // Methods for handling user interactions
   methods: {

      // Emit an event when the input amount changes
      updateAmount() {

         this.$emit('input-change', this.amount); // Emit the current amount to the parent component

      },

      // Emit an event when the selected currency changes
      updateCurrency() {

         this.$emit('currency-change', this.selectedCurrencyValue); // Emit the selected currency to the parent component

      },

   },

   // Watchers to react to changes in props
   watch: {

      // Watch for changes in the [inputAmount prop]
      inputAmount(newValue) {

         this.amount = newValue; // Update local [amount] when the prop changes

      },

      // Watch for changes in the [selectedCurrency prop] 
      selectedCurrency(newValue) {

         this.selectedCurrencyValue = newValue; // Update local currency [selectedCurrencyValue] when the prop changes

      },

   }

}
</script>

<template>

   <div class="input-group">

      <!-- Amount Input Field -->
      <input class="form-control" type="number" placeholder="Enter amount" v-model="amount" @input="updateAmount">
      <!-- /Amount Input Field -->

      <!-- Dropdown Currency Select -->
      <select class="form-select" v-model="selectedCurrencyValue" @change="updateCurrency">

         <option v-for="(currency, i) in currenciesKeys" :key="currency" :value="currency"
            :disabled="disabledCurrencies.includes(currency)">
            {{ `${currenciesValues[i]} (${currency})` }}
         </option>

      </select>
      <!-- /Dropdown Currency Select -->

   </div>

</template>

<style scoped lang="scss">
.input-group {
  border-radius: 0.5rem;
  border: 1px solid #1E88E5;
}
.form-control, .form-select {
  border: 1px solid #1E88E5; /* Colore blu primario */
}
.form-control:focus, .form-select:focus {
  border-color: #FFB74D; /* Colore arancione caldo */
  box-shadow: 0 0 0 0.2rem rgba(255,183,77,.25); /* Ombra arancione */
}
</style>