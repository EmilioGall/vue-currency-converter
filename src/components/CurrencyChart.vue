<script>
export default {

   props: {

      //

   },

   data() {
      return {

         series: [{

            name: 'Voti',
            data: [30, 40, 45, 50, 49, 60, 70]

         }],

         chartOptions: {

            chart: {
               type: 'bar',
               height: 350
            },

            title: {
               text: 'Esempio di Grafico a Barre'
            },

            xaxis: {
               categories: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio']
            }
         }
         
      };
   },

   methods: {

      //

   },

}
</script>

<template>

   <div>

      <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>

   </div>

</template>

<style scoped lang="scss"></style>