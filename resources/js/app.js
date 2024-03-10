import './bootstrap';
import { createApp } from "vue/dist/vue.esm-bundler";
import { onMounted } from 'vue'
import { TailwindPagination } from 'laravel-vue-pagination';// import 'element-plus/dist/index.css';
// import App from './layouts/App.vue'
import router from './routes/index.js'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import useAuth from './composables/auth.js'


const app = createApp({
    setup() {
        const { getUser } = useAuth()
        onMounted(getUser)
    }
})

app.use(router)
app.use(VueSweetalert2)
app.component('TailwindPagination', TailwindPagination)
app.mount('#app')
