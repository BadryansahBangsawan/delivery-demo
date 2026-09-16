# delivery-demo

Public Expo demo of a delivery-style mobile app (not a production store).

Use this repo to explore the UI flow only. Orders, payments, and courier tracking are mocked — nothing here talks to a live backend.

## Welcome

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

You need [Node.js LTS](https://nodejs.org/) on your PATH before the steps below (`node -v` should print a version).

1. Install dependencies

   ```bash
   npm install
   ```

   The repo also ships a `bun.lock` for Bun users; either lockfile works for this demo, but stick to one package manager in a given clone so `node_modules` stays consistent.

2. Start the app

   ```bash
   npx expo start
   ```

In the Expo CLI output, choose one of these targets to open the app:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

Shared UI pieces, hooks, and client state live under `components/`, `hooks/`, and `store/` — change those when a tweak should apply across multiple screens instead of editing each route file.

TypeScript types for routes and shared modules resolve from the project `tsconfig.json`; after renaming a screen file under `app/`, restart the TypeScript server in your editor if path imports still show stale errors.

With `npx expo start` still running, most edits under `app/` hot-reload in the open simulator or Expo Go session — restart the Metro bundler only if a native module or app config change requires it.

On a physical phone, open Expo Go and scan the QR code printed in the terminal after `npx expo start` (same LAN, or tunnel mode if the device is off the LAN).

Screen and route files under `app/` are TypeScript (`.tsx`) and follow Expo Router conventions — keep new screens in that tree so deep links and tab navigation stay consistent.

## Get a fresh project

Skip this section if you only want to browse the delivery UI demo — `npx expo start` above is enough.

When you're ready to strip the demo screens and start from a blank Expo Router tree, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

Static images and icons used by the screens live under `assets/` — swap those files when branding the demo UI without changing route code.

## Status

This repository is a **public demo** for learning Expo routing and a delivery-style UI. It is not a live courier product and should not take real orders.
