<script>

export default {

  //

}

</script>

<template>

  <main class="container p-5">

    <div class="row g-2 py-3 px-5 border rounded-5">

      <h1 class="fs-1 text-center text-white">CURRENCY CONVERTER</h1>

      <span class="fs-5 text-white">1,00€ è uguale a</span>

      <span class="fs-2 text-white">0,95 CHF</span>

      <!-- First Input Group -->
      <div class="input-group col-2">

        <input class="btn btn-light" type="number" name="input-number-above" id="input-number-above" value="1">

        <select class="form-select btn btn-outline-light" id="inputGroupSelect01">

          <option selected value="1">CurrencyOne</option>
          <option value="2">CurrencyTwo</option>
          <option value="3">CurrencyThree</option>

        </select>

      </div>
      <!-- /First Input Group -->

      <!-- Second Input Group -->
      <div class="input-group col-2">

        <input class="btn btn-light" type="number" name="input-number-above" id="input-number-above" value="1">

        <select class="form-select btn btn-outline-light" id="inputGroupSelect01">

          <option selected value="1">CurrencyOne</option>
          <option value="2">CurrencyTwo</option>
          <option value="3">CurrencyThree</option>

        </select>

      </div>
      <!-- /Second Input Group -->

    </div>

  </main>

</template>

<style scoped lang="scss"></style>
