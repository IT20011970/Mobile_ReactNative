# 1. IT Knowledge Base - Mobile App
**Index No:** MSC-CS-2025-013

Department of Statistics & Computer Science, University of Kelaniya
**COSC 64173 - Mobile Computing - Assignment 01**

##  Demonstration Video
**Live / Video demo:**  - https://drive.google.com/file/d/1yZOjpvKNz_JdoF6MavpUwo7Xn8WPhR59/view?usp=sharing

## 2. Screens - how many and what each does

The app has 4 main screens and a few hidden routing and layout files:
- Knowledge Base: This is the home screen where users can browse tips, filter them, and bookmark them to save to favourites.
- Entry Detail (tips/[id].js): After clicking one entry, a dynamic route that shows one entry with full details. It includes things like category, title, summary, the Cause & Fix, tags, and author/date
- Favorites (favorites.js): Shows only the entries where the user has selected the save button. All bookmarks have a Remove button.
- Add Entry (add.js): This form is used to add new Tips to the knowledge base it has entries like title, category, summary, tags, and cause & fix. 
- Background Files: While index.js reroutes the root URL to the home screen, _layout.js files manage the structure and navigation of the application.
