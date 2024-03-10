<template>
    <form @submit.prevent="submitLogin">
        <!-- Email Address -->
        <div>
            <label for="email" class="black font-medium text-sm ">Email</label>
            <input v-model="loginForm.email" id="email" class="block mt-1 w-full text-black" type="email" name="email" required
                autofocus autocomplete="username" />
            <div class="text-red-600 mt-1">
                <div v-for="message in validationErrors?.email">
                    {{ message }}
                </div>
            </div>
        </div>

        <!-- Password -->
        <div class="mt-4">
            <label for="password" class="black font-medium text-sm ">Password</label>
            <input id="password" class="block mt-1 w-full text-black" type="password" v-model="loginForm.password" required
                autocomplete="current-password" />

            <div class="text-red-600 mt-1">
                <div v-for="message in validationErrors?.password">
                    {{ message }}
                </div>
            </div>
        </div>

        <!-- Remember Me -->
        <div class="block mt-4">
            <label for="remember_me" class="inline-flex items-center">
                <input id="remember_me" type="checkbox" v-model="loginForm.remember_me"
                    class="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
                    name="remember">
                <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
            </label>
        </div>

        <div class="flex items-center justify-end mt-4">

            <button class="px-3 mt-4 py-2 bg-blue-600 text-white rounded">login</button>

        </div>
    </form>
</template>
<script setup>
import useAuth from '../composables/auth.js'

const {submitLogin,loginForm, validationErrors } = useAuth()
</script>