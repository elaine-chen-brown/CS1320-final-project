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
- Basic routing implemented

## To do for Backend People
- server.js
    - Handle routing with parameters (to /article/:articleId, /author/:authorId, and /category/:categoryName endpoints)
- Every pagename.js (in controllers) and pagename.hbs (in views) pair
    - Handle form submit events for search and subscribe input fields in header (can do it once and copy and paste)
    - Populate dictionary to be rendered based on results of database queries (unique for every page. they're currently static values)
- search.js and search.hbs
    - Handle search bar input events
- article.js and article.hbs
    - Handle social media button clicked events
- archive.js and archive.hbs
    - Handle button clicked events
- style.css (in public)
    - Replace background-image in about-image and join-image with actual images that The Noser wants to use
    - Or replace with a better way to display background images

### Note: feel free to restructure stuff if you want!

#### 3/29
- added db connection, routing and loading for articles and authors
- pages should fill information if gone to directly, ie /article/100 or /author/30
- images are still only using defaults until we set up some sort of image hosting
- clicking on author in article page goes to author page
- author page has author articles sorted with newest first
- database cleaned to fix bad utf8 values and add publish date to the articles table (use new .sql file editnoser.sql)

#### Connecting to database locally
- database config is in app/config/db.config.js
- make sure mysql installed
- create new database (named noser_edited or change value in the config)
- use editnoser.sql to load the database (run from where where mysql is installed: mysql -u root -p noser_edited < "path\to\sqlfile")