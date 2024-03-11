<script>
import useAuth from '../composables/auth.js' 
import {onMounted} from "vue";
import { useAbility } from '@casl/vue';

export default {
    computed :{
        currentPageTitle(){
            return this.$route.meta.title
        }
    },

    setup(){
        const {user,logout,getUser} = useAuth()
        const { can } = useAbility()
        onMounted(getUser)
        return {user,logout,can}

    }
}
</script>

<template>
    <div class="min-h-screen bg-grat-100">
        <header class="bg-white dark:bg-gray-800 shadow">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h2 class="font-semibold text-xl text-white  leading-tight">
                    {{ currentPageTitle }}
                </h2>
            </div>
        </header>
        <nav class="bg-black boarder-b boarder-gray-100">
            <!-- Primary Navigation Menu -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex">
                        <!-- Navigation Links -->
                        <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex text-white">
                            <router-link :to="{name:'posts.index'}" active-class="boarder-b-2 boarder-white-400"
                                class="inline-flex items-center px-1 pt-1">
                                Posts
                            </router-link>
                            <router-link v-if="can('posts.create')" :to="{name:'posts.create'}" active-class="boarder-b-2 boarder-white-400 "
                                class="inline-flex items-center px-1 pt-1 ">
                                cretae Post
                            </router-link>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div>
                            <div>
                                Hi, {{ user.name }}
                            </div>
                            <div class="text-sm text-gray-500">{{ user.email }}</div>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div>
                            <button @click="logout" type="button" class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded">logout</button>
                        </div>
                    </div>

                </div>
            </div>

        </nav>
       
        <main>

            <div class="py-12">
                <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div class="p-6 text-gray-900 dark:text-gray-100">
                            <router-view></router-view>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

