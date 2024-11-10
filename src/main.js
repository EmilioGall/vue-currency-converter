import { createApp } from 'vue';

// Import Bootstrap
import "bootstrap";

// Import SASS
import './scss/general.scss';

// Import ApexChart
import VueApexCharts from "vue3-apexcharts";

import App from './App.vue';

createApp(App).use(VueApexCharts).component("Apexchart", VueApexCharts).mount('#app');
