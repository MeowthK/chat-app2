# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in your desired directory
npm create svelte@latest chat-app2

# cd to newly created project directory
cd chat-app2

# install dependencies
npm install pusher-js dotenv axios

# create backend directory
mkdir backend

# cd to backend, initialize and install these dependencies
cd backend
npm init
npm install express cors nodemon dotenv pusher mongoose
```

Then download the repository and overwrite files inside the project directory.
You must also create an environment variable storage (.env) inside the backend directory with the following contents:
```
PORT=4000
PUSHER_KEY="3549143eed17ea1061f5"
PUSHER_SECRET="140f9477cd87a5a24374"
DB_CONSTRING=mongodb://127.0.0.1:27017/simple-chat
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash

# for running the front-end
npm run dev

# for backend
cd backend
npm run server

Run these commands on a separate terminal.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
