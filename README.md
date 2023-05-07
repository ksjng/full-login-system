# full-login-system

Register & login system created using **Fastify**, **Prisma**, **Nuxt3** and **Tailwind**.

## Features

* Sign up form protected by hCaptcha
* Account activation emails
* Password reset feature
* Multi-factor TOTP authentication
* Backup codes for MFA
* Gravatar support
* Changing email and password in dashboard

## Setup

There are 3 files to pay attention to.

* **Main config** - `/api/config.js`

* **Prisma env** - `/api/prisma/.env`

* **Nuxt env** - `/client/.env`

## Run in development mode

1. Clone this repository.

2. Install dependencies - `npm install`

3. Set up configs

4. Run API server - `npm run api:start`

5. Run Nuxt app - `npm run dev:client`

6. Go to `http://localhost:3000/`