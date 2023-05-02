<template>

    <div class="flex-1 px-4 mx-4 text-left">

        <h2 class="text-3xl m-8 text-center">Change password</h2>

        <div v-if="error" class="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Info</span>
            <p>{{ error }}</p>
        </div>

        <div v-if="success" class="flex p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Info</span>
            <p>Your password has been changed.</p>
        </div>

        <form @submit.prevent="submitChangePasswordForm" class="mt-5">

            <div class="mb-4">
                <label for="old_password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Old password</label>
                <input 
                    v-model="changePasswordFormData.oldPassword"
                    @change="v$.oldPassword.$touch"  
                    type="password" 
                    name="old_password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    :class="{
                        'border-red-500 focus:border-red-500': v$.oldPassword.$error,
                        'border-[#42d392] ': !v$.oldPassword.$invalid
                    }"  
                >
                <span class="text-xs text-red-500" v-if="v$.oldPassword.$error">{{ v$.oldPassword.$errors[0].$message }}</span>
            </div>

            <div class="mb-4">
                <label for="new_password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">New password</label>
                <input 
                    v-model="changePasswordFormData.newPassword"
                    @change="v$.newPassword.$touch"  
                    type="password" 
                    name="new_password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    :class="{
                        'border-red-500 focus:border-red-500': v$.newPassword.$error,
                        'border-[#42d392] ': !v$.newPassword.$invalid
                    }"  
                >
                <password-meter :password="changePasswordFormData.newPassword" />
                <span class="text-xs text-red-500" v-if="v$.newPassword.$error">{{ v$.newPassword.$errors[0].$message }}</span>
            </div>

            <div class="mb-4">
                <label for="repeat_new_password" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Repeat new password</label>
                <input 
                    v-model="changePasswordFormData.repeatNewPassword"
                    @change="v$.repeatNewPassword.$touch"  
                    type="password" 
                    name="repeat_new_password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    :class="{
                        'border-red-500 focus:border-red-500': v$.repeatNewPassword.$error,
                        'border-[#42d392] ': !v$.repeatNewPassword.$invalid
                    }"  
                >
                <span class="text-xs text-red-500" v-if="v$.repeatNewPassword.$error">{{ v$.repeatNewPassword.$errors[0].$message }}</span>
            </div>

            <button type="submit" class="float-right my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change password</button>

        </form>

    </div>

</template>


<script setup>

import { ref, reactive } from "vue";
import PasswordMeter from "vue-simple-password-meter";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, minLength, maxLength, sameAs } from "@vuelidate/validators";

const changePasswordFormData = reactive({
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: ""
});

const rules = computed(() => {
    return {
        oldPassword: {
            required: helpers.withMessage("The old password field is required", required)
        },
        newPassword: {
            required: helpers.withMessage("The new password field is required", required),
            minLength: minLength(8),
            maxLength: maxLength(72)
        },
        repeatNewPassword: {
            required: helpers.withMessage("The repeat new password field is required", required),
            sameAs: helpers.withMessage("Passwords don't match", sameAs(changePasswordFormData.newPassword))
        }
    }
});

const v$ = useVuelidate(rules, changePasswordFormData);

const error = ref("");
const success = ref(0);

const submitChangePasswordForm = async () => {

    v$.value.$validate();
    if(v$.value.$error) return;

    error.value = "";
    success.value = false;

    const { oldPassword, newPassword } = changePasswordFormData;

    try {

        const res = await fetch("/api/user/settings/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ oldPassword, newPassword })
        })

        if(!res.ok) throw new Error("Failed to connect with API server");
        const body = await res.json();

        if(!body.success) throw new Error(body.error);

        return success.value = true;

    } catch(err) {
        console.error(err);
        error.value = err.message;
    }

}

</script>