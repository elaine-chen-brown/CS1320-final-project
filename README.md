# CS1320-final-project

## To run
1. In terminal, navigate into this directory
2. Run "npm install" to install dependencies
3. Run "npm run start" to start server
4. Open a browser window and go to "localhost:8080" to see the site

## Current Functionality
- Home, article, search, author, about us, and join us pages templated
- All pages responsive to screen resizing
- Basic routing between pages

## To do for Backend People
### Note: each page is composed of a JS file in controllers and a hbs file in views
- Server
    - Handle routing with parameters (to /article/:articleId endpoints, etc)
- Every Page
    - Handle form submit events for search and subscribe input fields in header
- Home Page
    - Populate dictionary based on results of database queries
- Search Page
    - Populate dictionary based on results of database queries
    - Handle form submit/search input events
- Article Page
    - Populate dictionary based on results of database queries
    - Handle social media button clicked event
- Author Page
    - Populate dictionary based on results of database queries
- About Page
    - Populate dictionary based on results of database queries
- Join Page
    - Populate dictionary based on results of database queries
- style.css
    - Replace background-image in about-image and join-image with an actual images that The Noser wants to use
    - Or replace with a better way to display a background image

### Note: feel free to restructure stuff if you want!