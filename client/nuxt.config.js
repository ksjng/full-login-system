// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    modules: [
        "@nuxtjs/tailwindcss"
    ],

    nitro: {
        routeRules: {
            "/api/**": {
                proxy: "http://127.0.0.1:3001/api/**"
            }
        }
    },

    runtimeConfig: {
        public: {
            hCaptchaSiteKey: process.env.HCAPTCHA_SITE_KEY
        }
    }

})
