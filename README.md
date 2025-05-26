<H1 align="center"><b>rn-basic-template</b></H1>

_This project is just a basic empty template for React native app. But if you want to create a new React Native app with this template, You can just flow the instruction below._ 📄 **Full guide**: [Init with Expo (Local Build)](https://asifiqubal.notion.site/Init-with-Expo-Local-Build-1f66fbc267188079a098f89b7ab07c87)

# Init with Expo(Local Build)

## **App Init**

To initialize the app, simply run the following command in your terminal:

```bash
npx create-expo-app@latest
```

It will prompt you to set the app name. Once you've entered the name, you're done. If everything works correctly, this will create a new Expo (React Native) app.

**Note:** Expo apps only support **iOS**, **Android**, and **Web** platforms.

At this point, your app is ready for an Expo Go build. However, if you want to set up a local development build, you’ll need to follow a few additional steps:

1. Run the following command in your terminal to install the development client:

   ```bash
   npx expo install expo-dev-client
   ```

2. Then generate the native `ios` and `android` directories by running:

   ```bash
   npx expo prebuild
   ```

**Note:** These two commands should be run from your project’s root directory.

Now you're ready! To run the app in your simulator, use:

```bash
yarn android
```

or

```bash
yarn ios
```

---

### N.B: Here you may active [corepack](https://yarnpkg.com/corepack) for yarn if you want.

## Active cashing for faster build

> If you don’t know about it or not sure you need it or not, then you should skip this part.

### **Compiler cache:**

The following instructions will work for both Android & iOS. If you still not installed the ccash in your system then you just need to install it first with this command:

```bash
**brew install ccache**
```

For android. you ready to. Just run `yarn android` then delete the build and run it again you can see the diffrence that second one is faster then first one.

If you want build it for ios then you need to do some changes n Pod file.

Open `ios/Podfile` and set the `ccache_enabled` value `ture`

```bash
post_install do |installer|
# [https://github.com/facebook/react-native/blob/main/packages/react-native/scripts/react_native_pods.rb#L197-L202](https://github.com/facebook/react-native/blob/main/packages/react-native/scripts/react_native_pods.rb#L197-L202)
react_native_post_install(
installer,
config[:reactNativePath],
:mac_catalyst_enabled => false,
# TODO: Uncomment the line below
:ccache_enabled => true
)
end

```

Now you ready for ios also. If you want to verify it works or not you run this `ccache -s`

Alsos should you need to wipe your cache, you can do so with `ccache --clear`, to avoid poisoned cache problems.

### **Configuration Caching (Android-only):**

Since React Native 0.79, you can also enable Gradle Configuration Caching. For this you just need to update `gradle.properties` file. You can enable Gradle Configuration Caching by adding the following line in your `android/gradle.properties` file:

```groovy
org.gradle.configuration-cache=true
```

## Project Setup: Dependencies, Path Aliases, Navigation and Folder structure

In this section, we'll set up some essential development tools, configure custom path aliases, organize the folder structure, replace the default Expo Router with **React Navigation and create the folder structure.**

## 1. Install Development Dependencies

Start by installing the required development packages. Run the following command in the root of your project:

```groovy
yarn add -D babel-plugin-module-resolver eslint-config-prettier prettier @react-native/eslint-config metro-react-native-babel-preset
```

These packages help with code formatting, linting, and module resolution.

## 2. Replace `expo-router` with [`React Navigation`](https://reactnavigation.org/docs/getting-started)

We'll now switch from `expo-router` to [`React Navigation`](https://reactnavigation.org/docs/getting-started), which gives us more flexibility in managing navigation.

### Step 1: Remove `expo-router`

```groovy
yarn remove expo-router
```

This will uninstall `expo-router` and remove its related dependencies.

### Step 2: Update `app.json`

- Remove `expo-router` from the `plugins` array.
- Remove the `web` configuration section.
- Remove the `typedRoutes` key under the `experiments` section.

### Step 3: Set Up the New Entry Point

Create a new entry file called `index.js` in the root directory with the following content:

```jsx
import { registerRootComponent } from "expo";
import { App } from "./app/App";

registerRootComponent(App);
```

This registers your main app component with Expo.

### Step 4: Create `App.tsx` for Navigation

Inside the `app` folder, create a new file called `App.tsx`. This is where you'll define your main navigation structure using React Navigation.

### **Step 5: Update `package.json`**

Finally, make sure the `main` field in your `package.json` points to the new entry file:

```json
"main": "index.js"
```

Once your navigation setup is complete, your app will be ready to run without `expo-router`.

## 3. Create Folder Structure

Now lets create the folder structure. For folder sruccture we going to flow the [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/). So the folder structure will be looks like:

```markdown
📁 project-root/
├── 📁 app/
│ ├── 📁 api/ // All API-related code goes here. API call hooks are placed in the hooks folder.
│ ├── 📁 components/ // Common components used in more than two places across the project.
│ │ ├── 📁 atom/ // Component categorization (atom, molecules, organisms) is detailed in the ADM documentation.
│ │ ├── 📁 molecules/
│ │ └── 📁 organisms/
│ ├── 📁 helpers/ // All helper functions reside here.
│ ├── 📁 hooks/ // All hooks, including API-related ones (except store hooks), are placed here.
│ ├── 📁 navigation/ // Navigation-related code lives here.
│ ├── 📁 screens/ // All screen components are organized in this folder.
│ ├── 📁 store/ // Contains state management/store-related logic.
│ └── 📄 App.tsx // Root component of the application.
├── 📄 index.js // Entry point of the app.
└── 📄 package.json // Project configuration and dependencies.
```

## 4. Setting Up Path Aliases

To implement custom path aliases in your project, you’ll need to configure both the `tsconfig.json` and `babel.config.js` files. This improves code readability and maintainability, especially in large projects with deeply nested folder structures.

### Step 1: Update `tsconfig.json`

Start by defining your custom aliases under the `compilerOptions` section. Based on the folder structure above, here is a sample configuration:

```json
{
  //...
  "compilerOptions": {
    //...
    "baseUrl": ".",
    "paths": {
      "@app/*": ["app/*"],
      "@api/*": ["app/api/*"],
      "@components/*": ["app/components/*"],
      "@components/atom/*": ["app/components/atom/*"],
      "@components/molecules/*": ["app/components/molecules/*"],
      "@components/organisms/*": ["app/components/organisms/*"],
      "@helpers/*": ["app/helpers/*"],
      "@hooks/*": ["app/hooks/*"],
      "@navigation/*": ["app/navigation/*"],
      "@screens/*": ["app/screens/*"],
      "@store/*": ["app/store/*"]
    }
  }
  //...
}
```

### Step 2: Configure `babel.config.js`

Next, configure Babel to recognize the same aliases at runtime by using the `module-resolver` plugin:

```jsx
module.exports = {
  presets: ["babel-preset-expo"], // or 'module:metro-react-native-babel-preset'
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@app": "./app",
          "@api": "./app/api",
          "@components": "./app/components",
          "@components/atom": "./app/components/atom",
          "@components/molecules": "./app/components/molecules",
          "@components/organisms": "./app/components/organisms",
          "@helpers": "./app/helpers",
          "@hooks": "./app/hooks",
          "@navigation": "./app/navigation",
          "@screens": "./app/screens",
          "@store": "./app/store",
        },
      },
    ],
  ],
};
```

### Final Step: Restart Your Development Environment

After making these changes:

1. Restart your development server:
   - For Expo: `npx expo start --clear`
   - For React Native CLI: `npx react-native start --reset-cache`
2. Restart your code editor (e.g., VS Code) to ensure TypeScript picks up the updated config.

You can now import modules using custom aliases, like so:

```tsx
import { Button } from "@components";
import { useAuth } from "@hooks";
```

This setup enhances clarity and consistency across your codebase.
