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

      };
   },

}
</script>

<template>

   <div class="input-group col-2">

      <input class="btn btn-light" type="number" :value="inputAmount">

      <select class="form-select btn btn-outline-light">

         <option v-for="(currency, i) in currenciesKeys" :key="currency" :value="currency" :selected="selectedCurrency == currency">{{ `${currenciesValues[i]} (${currency})` }}</option>

      </select>

   </div>

</template>

<style scoped lang="scss"></style>