import { createApp } from 'vue';

// Import SASS
import './scss/general.scss';

// Import Bootstrap
import "bootstrap";

// Import ApexChart
import VueApexCharts from "vue3-apexcharts";

import App from './App.vue';

createApp(App).use(VueApexCharts).component("apexchart", VueApexCharts).mount('#app');
