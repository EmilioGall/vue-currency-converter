<script>
export default {

   props: {

      currencies: Array,
      currenciesList: Array,

   },

   data() {
      return {

      };
   },

}
</script>

<template>

   <div class="input-group col-2">

      <input class="btn btn-light" type="number" name="input-number-above" id="input-number-above" value="1">

      <select class="form-select btn btn-outline-light" id="inputGroupSelect01">

         <option v-for="(currency, i) in currencies" :key="currency" :value="currency">{{ `${currenciesList[i]} (${currency})` }}</option>

      </select>

   </div>

</template>

<style scoped lang="scss"></style>