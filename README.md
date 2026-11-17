# IT Knowledge Base - Mobile App
**Index No:** MSC-CS-2025-013

Department of Statistics & Computer Science, University of Kelaniya
**COSC 64173 - Mobile Computing - Assignment 01**

## 1. Demonstration Video
**Live / Video demo:**  - https://drive.google.com/file/d/1yZOjpvKNz_JdoF6MavpUwo7Xn8WPhR59/view?usp=sharing

## 2. Screens - how many and what each does

The app has 4 main screens and a few hidden routing and layout files:
- Knowledge Base: This is the home screen where users can browse tips, filter them, and bookmark them to save to favourites.
- Entry Detail (tips/[id].js): After clicking one entry, a dynamic route that shows one entry with full details. It includes things like category, title, summary, the Cause & Fix, tags, and author/date
- Favorites (favorites.js): Shows only the entries where the user has selected the save button. All bookmarks have a Remove button.
- Add Entry (add.js): This form is used to add new Tips to the knowledge base it has entries like title, category, summary, tags, and cause & fix. 
- Background Files: While index.js reroutes the root URL to the home screen, _layout.js files manage the structure and navigation of the application.

## 3. Core React Native components used, and where

- View: Used across every screen for layout containers.
- Text: Used across every screen to display all text.
- Image: Implemented in src/components/TipImage.js for the category image with a fallback.
- Pressable: Used for cards, bookmark/save buttons, filter options, category chips, and the save button (tips/index.js, favorites.js, add.js).
- FlatList: Implemented in src/app/(tabs)/tips/index.js and src/app/(tabs)/favorites.js to render the lists.
- Modal: Used in src/app/(tabs)/tips/index.js for the category filter sheet.
- TextInput: Implemented in src/app/(tabs)/add.js for the Add Entry form fields.
- ScrollView: Used in src/app/(tabs)/tips/[id].js and src/app/(tabs)/add.js for scrolling.
- StyleSheet: Used across all screens for styling.
- AppState: Implemented in src/app/_layout.js to detect when the app moves from the background to the foreground.
- React / Hooks: useState, useEffect, useRef, useContext, createContext.
- Expo Router: Stack, Tabs, Redirect, useRouter, useLocalSearchParams.
- Storage / Notifications: @react-native-async-storage/async-storage, expo-notification

## 4. How Expo Router is structured (app/ directory)

Routing is file-based, meaning the folder and file layout under src/app/ forms the navigation tree (configured via expo-router):

- src/app/_layout.js: Root Stack that wraps the app in context providers, registers notifications, runs the AppState listener, and renders global banners.
- src/app/index.js: Redirects "/" to "/tips" to give the app a starting route.
- src/app/(tabs)/_layout.js: Tab navigator handling Knowledge Base, Favorites, and Add Entry.
- src/app/(tabs)/favorites.js: Tab screen for the /favorites route.
- src/app/(tabs)/add.js: Tab screen for the /add route.
- src/app/(tabs)/tips/_layout.js: Stack navigator nested inside the Knowledge Base tab.
- src/app/(tabs)/tips/index.js: List screen for the /tips route.
- src/app/(tabs)/tips/[id].js: Detail screen for the dynamic /tips/:id route.