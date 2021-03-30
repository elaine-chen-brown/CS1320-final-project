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

#### 3/30 most viewed articles
- setup db query to get articles with most views
- for now loading 5 most viewed but only after 2014 to prioritize newer ones (kinda arbitrary cutoff)
- at some point will need to add something to increase the number of views when page viewed :but want to be careful not to mess up their data
- also the most viewed column is a bit all close together idk if we want to space them out a bit more or put dividers or not

#### 3/30 archive page
- setup archive page to query db to display possible years and get issues from those years
- /archive/:year shows the issues from that year
- /archive redirects to the most recent year
- some of the links for the issues display a bit funny especially when only one column - need to look at more
- also found some symbols still in the database that will need fixing later
- should look into incorporating issuu?

#### 3/30 issue page
- made issue page (/issue/issueId) to display all the articles from one particular issue (to go to from archive)
- puts featured article at top then rest in no particular order
- copied category page structure but probably want to change things around still esp the side bar
- still need to deal with if featured article is null probably

#### 3/29 about page
- added db queries for about page
- loads authors sorted first by position, then by name , taking only authors marked as current
- the current data is kinda out of sync - very old authors are marked as current etc
- also made staff names on about page redirect to their author page
- still need to handle unhandled promise warnings, ie going to /author/8 breaks

#### 3/29 again
- added db for category pages
- fixed link for categories in navbar
- currently featured category article is most recent 
- can change later to make featuredArticleId an optional field for each category (in db) and then display only if set
- rn the articles just load all at once - maybe want to have them infinte scroll?

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