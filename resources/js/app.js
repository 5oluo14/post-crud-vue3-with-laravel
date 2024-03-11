import './bootstrap';
import { createApp } from "vue/dist/vue.esm-bundler";
import { TailwindPagination } from 'laravel-vue-pagination';// import 'element-plus/dist/index.css';
// import App from './layouts/App.vue'
import router from './routes/index.js'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { abilitiesPlugin } from '@casl/vue';
import ability from './services/ability';



const app = createApp({})

app.use(router)
app.use(VueSweetalert2)
app.use(abilitiesPlugin, ability)
app.component('TailwindPagination', TailwindPagination)
app.mount('#app')
