<template>
    
    <main class="grid place-items-center min-h-screen m-auto">

        <div class="max-w-prose w-full p-5 mt-10">

            <h1 class="font-medium text-4xl my-5">Sign in</h1>

            <div v-if="error" class="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Info</span>
                <p>{{ error }}</p>
            </div>

            <form @submit.prevent="submitLoginForm">

                <div class="mb-4">
                    <label for="login" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Username or email</label>
                    <input 
                        v-model="loginFormData.login"
                        @change="v$.login.$touch"  
                        type="text" 
                        name="login"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :class="{
                            'border-red-500 focus:border-red-500': v$.login.$error,
                            'border-[#42d392] ': !v$.login.$invalid
                        }"  
                    >
                    <span class="text-xs text-red-500" v-if="v$.login.$error">{{ v$.login.$errors[0].$message }}</span>
                </div>

                <div class="mb-4">
                    <label for="password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input 
                        v-model="loginFormData.password" 
                        @change="v$.password.$touch" 
                        type="password" 
                        name="password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :class="{
                            'border-red-500 focus:border-red-500': v$.password.$error,
                            'border-[#42d392] ': !v$.password.$invalid
                        }"    
                    >
                    <span class="text-xs text-red-500" v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</span>
                </div>

                <button type="submit" class="float-right my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
            
                <p class="text-small mt-16 text-gray-700">Don't have an account? <nuxt-link to="/register" class="text-blue-800 hover:text-blue-500">Sign up</nuxt-link>.</p>
                <p class="text-small text-gray-700">Forgot your password? <nuxt-link to="/recover" class="text-blue-800 hover:text-blue-500">Recover password</nuxt-link>.</p>

            </form>

        </div>

    </main>

</template>


<script setup>

import { ref, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

const loginFormData = reactive({
    login: "",
    password: ""
});

const rules = computed(() => {
    return {
        login: {
            required: helpers.withMessage("The username field is required", required)
        },
        password: {
            required: helpers.withMessage("The password field is required", required)
        }
    }
});

const v$ = useVuelidate(rules, loginFormData);

const error = ref("");

const submitLoginForm = async () => {

    v$.value.$validate();
    if(v$.value.$error) return;

    error.value = "";

    try {

        const res = await fetch("/api/user/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginFormData)
        })

        if(!res.ok) throw new Error("Failed to connect with API server");
        const body = await res.json();

        if(!body.success) throw new Error(body.error);

        return await navigateTo("/dashboard");

    } catch(err) {
        console.error(err);
        error.value = err.message;
    }

}

</script>