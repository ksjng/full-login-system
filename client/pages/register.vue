<template>
    
    <main class="grid place-items-center min-h-screen m-auto">

        <div class="max-w-prose w-full p-5">

            <h1 class="font-medium text-4xl my-5">Sign up</h1>

            <form>

                <div class="mb-4">
                    <label for="username" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input type="username" id="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>

                <div class="mb-4">
                    <label for="email" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>

                <div class="mb-4">
                    <label for="password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>

                <div class="mb-4">
                    <label for="repeat_password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                    <input type="password" id="repeat_password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>

                <vue-hcaptcha :sitekey="config.public.hCaptchaSiteKey"></vue-hcaptcha>

                <small class="block text-small mb-3 text-gray-500">By registering you agree to our Terms of Service and Privacy Policy.</small>

                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button>
            
            </form>

        </div>

    </main>

</template>

<script setup>
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";

const config = useRuntimeConfig();

</script>