<template>
    
    <main class="grid place-items-center min-h-screen m-auto">

        <div class="max-w-prose w-full p-5 mt-10">

            <h1 class="font-medium text-4xl my-5">Sign up</h1>

            <form>

                <div class="mb-4">
                    <label for="username" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <input 
                        v-model="registerFormData.username" 
                        @change="v$.username.$touch" 
                        type="text" 
                        name="username"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :class="{
                            'border-red-500 focus:border-red-500': v$.username.$error,
                            'border-[#42d392] ': !v$.username.$invalid
                        }"
                    >
                    <span class="text-xs text-red-500" v-if="v$.username.$error">{{ v$.username.$errors[0].$message }}</span>
                </div>

                <div class="mb-4">
                    <label for="email" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input 
                        v-model="registerFormData.email" 
                        @change="v$.email.$touch" 
                        type="email" 
                        name="email"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :class="{
                            'border-red-500 focus:border-red-500': v$.email.$error,
                            'border-[#42d392] ': !v$.email.$invalid
                        }"
                    >
                    <span class="text-xs text-red-500" v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
                </div>

                <div class="mb-4">
                    <label for="password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input 
                        v-model="registerFormData.password" 
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

                <div class="mb-4">
                    <label for="repeat_password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                    <input 
                        v-model="registerFormData.repeatPassword" 
                        @change="v$.repeatPassword.$touch" 
                        type="password" 
                        name="repeat_password"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        :class="{
                            'border-red-500 focus:border-red-500': v$.repeatPassword.$error,
                            'border-[#42d392] ': !v$.repeatPassword.$invalid
                        }"
                    >
                    <span class="text-xs text-red-500" v-if="v$.repeatPassword.$error">{{ v$.repeatPassword.$errors[0].$message }}</span>
                </div>

                <vue-hcaptcha :sitekey="config.public.hCaptchaSiteKey"></vue-hcaptcha>

                <small class="block text-small my-3 text-gray-500">By registering you agree to our Terms of Service and Privacy Policy.</small>

                <button type="submit" class="float-right my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button>
            
                <p class="text-small mt-16 text-gray-700">Already have an account? <nuxt-link to="/login" class="text-blue-800 hover:text-blue-500">Log in</nuxt-link>.</p>

            </form>

        </div>

    </main>

</template>


<script setup>

import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs, minLength, maxLength, helpers } from "@vuelidate/validators";

const config = useRuntimeConfig();

const registerFormData = reactive({
    username: "",
    email: "",
    password: "",
    repeatPassword: null,
    captcha: null
});

const rules = computed(() => {
    return {
        username: {
            required: helpers.withMessage("The username field is required", required),
            minLength: minLength(4),
            maxLength: maxLength(20)
        },
        email: {
            required: helpers.withMessage("The email field is required", required),
            email: helpers.withMessage("Invalid email format", email)
        },
        password: {
            required: helpers.withMessage("The password field is required", required),
            minLength: minLength(8)
        },
        repeatPassword: {
            required: helpers.withMessage("The repeat password field is required", required),
            sameAs: helpers.withMessage("Passwords don't match", sameAs(registerFormData.password))
        },
        captcha: {
            required: helpers.withMessage("Captcha is required", required)
        }
    }
});

const v$ = useVuelidate(rules, registerFormData);

</script>