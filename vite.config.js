import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from "@vitejs/plugin-vue";
// import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
// import {resolve,dirname} from 'node:path'
import {fileURLToPath,URL} from 'node:url'
export default defineConfig({

    plugins: [
        vue(),
        // VueI18nPlugin({
        //     include:resolve(dirname(fileURLToPath(import.meta.url)), './locales/*')
        // }),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),

    ],
    resolve:{
        alias:{
            '@':fileURLToPath(new URL('./src',import.meta.url))
        }
    }
});
