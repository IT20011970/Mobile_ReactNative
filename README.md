# IT Knowledge Base - Mobile App
**Index No:** MSC-CS-2025-013

Department of Statistics & Computer Science, University of Kelaniya
**COSC 64173 - Mobile Computing - Assignment 01**

## 1. What is the application, and what problem does it solve?

- **IT Knowledge Base** is a mobile app for an IT department to properly record KTs (Knowledge Transfers) and look up fixes for recurring issues with minimal effort.

- **The problem:** Support employees in an office frequently resolve the same problems (a printer driver installation issue, an internal system issue, VPN issues). One person typically has the knowledge of *how* each was fixed. The next technician must find the solution again from scratch if that person becomes busy or quits.

- **The solution:** Each resolved issue is recorded once as an entry (problem, cause, and fix) under a category. Anyone can add new entries, share their knowledge, browse previous knowledge tips, read the entire fix, bookmark and save helpful ones, and filter by category.


## 2. Demonstration Video
**Live / Video demo:**  - https://drive.google.com/file/d/1yZOjpvKNz_JdoF6MavpUwo7Xn8WPhR59/view?usp=sharing

## 3. Screens - how many and what each does

The app has 4 main screens and a few hidden routing and layout files:
- Knowledge Base: This is the home screen where users can browse tips, filter them, and bookmark them to save to favourites.
- Entry Detail (tips/[id].js): After clicking one entry, a dynamic route that shows one entry with full details. It includes things like category, title, summary, the Cause & Fix, tags, and author/date
- Favorites (favorites.js): Shows only the entries where the user has selected the save button. All bookmarks have a Remove button.
- Add Entry (add.js): This form is used to add new Tips to the knowledge base it has entries like title, category, summary, tags, and cause & fix. 
- Background Files: While index.js reroutes the root URL to the home screen, _layout.js files manage the structure and navigation of the application.

## 4. Core React Native components used, and where they are implemented

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

## 5. How Expo Router is structured (app/ directory)

Routing is file-based, meaning the folder and file layout under src/app/ forms the navigation tree (configured via expo-router):

- src/app/_layout.js: Root Stack that wraps the app in context providers, registers notifications, runs the AppState listener, and renders global banners.
- src/app/index.js: Redirects "/" to "/tips" to give the app a starting route.
- src/app/(tabs)/_layout.js: Tab navigator handling Knowledge Base, Favorites, and Add Entry.
- src/app/(tabs)/favorites.js: Tab screen for the /favorites route.
- src/app/(tabs)/add.js: Tab screen for the /add route.
- src/app/(tabs)/tips/_layout.js: Stack navigator nested inside the Knowledge Base tab.
- src/app/(tabs)/tips/index.js: List screen for the /tips route.
- src/app/(tabs)/tips/[id].js: Detail screen for the dynamic /tips/:id route.

## 6. Local notifications 

- Notification handler: Must be configured once at the module level using setNotificationHandler(...) outside of any component so notifications appear when the app is open.
- Permissions: Verify access with getPermissionsAsync() and only call requestPermissionsAsync() if not already granted.
- Android channel: Android 8+ requires setNotificationChannelAsync('default', ...) to prevent notifications from being silently dropped.

Notifications are triggered in two places:

- Tip bookmarked: Fires a "Tip bookmarked!" notification from tips/index.js when a user saves a tip.
- New tip added: Fires a "New tip added" notification from TipsContext.addTip when a new entry is created.
- Platform support: Local notifications only display on a physical device or an Android emulator. They do not show on web or the iOS Simulator