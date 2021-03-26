# CS1320-final-project

## To run
1. In terminal, navigate into this directory
2. Run "npm install" to install dependencies
3. Run "npm run start" to start server
4. Open a browser window and go to "localhost:8080" to see the site

## Current Functionality
- All pages created and reachable on server
- All pages responsive to screen resizing
- All pages templated
- Basic routing between pages

## To do for Backend People
### Note: each page is composed of a JS file in controllers and a hbs file in views
- Server
    - Handle routing with parameters (to /article/:articleId, /author/:authorId, and /category/:categoryName endpoints)
- Every Page
    - Handle form submit events for search and subscribe input fields in header
    - Populate dictionary to be rendered based on results of database queries
- Search Page
    - Handle search bar input events
- Article Page
    - Handle social media button clicked events
- Stylesheet (style.css in public)
    - Replace background-image in about-image and join-image with actual images that The Noser wants to use
    - Or replace with a better way to display background images

### Note: feel free to restructure stuff if you want!