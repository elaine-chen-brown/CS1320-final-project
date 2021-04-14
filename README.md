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
- server.js -- DONE
    - Handle routing with parameters (to /article/:articleId, /author/:authorId, and /category/:categoryName endpoints)
- Every pagename.js (in controllers) and pagename.hbs (in views) pair -- DONE
    - Handle form submit events for search and subscribe input fields in header (can do it once and copy and paste)
    - Populate dictionary to be rendered based on results of database queries (unique for every page. they're currently static values)
- search.js and search.hbs -- DONE
    - Handle search bar input events
- article.js and article.hbs
    - Handle social media button clicked events
- archive.js and archive.hbs -- DONE
    - Handle button clicked events
- style.css (in public)
    - Replace background-image in about-image and join-image with actual images that The Noser wants to use
    - Or replace with a better way to display background images

## Database TODOs:
- Author table needs to be reworked to include photo and social media handle(s)
- Images database: how will we store multiple images per article? Will also need to store 'main' image for purposes of home/search page display.
- Create drafts table: should hold headline, article body (in html formatting), teaser, author name + id, category name + id, photo information. Things like date and issue id will only be determined upon publishing

### Note: feel free to restructure stuff if you want!

#### 4/14
- author default image changed

#### 4/14
- all pages protected
- logout implemented

#### 4/13 
- changed sql query so featured article on home page is the recent issue's featured article or the most recent topical article (whichever is newer)

#### 4/13
- login
    - works for dashboard and edit pages (protected if not logged in)
    - login with right username (test) and password (test) directs to dashboard
- to use
    - reload sql file to include login table
- to do still:
    - better security (hash password + salt)
    - implement forgot password


#### 4/12 search + error handling
- fix null object rendering of author results
- fix authors not appearing if no articles returned (ie sol kim search)
- changed queries to return empty rather than error
- put default image for search results and removed popular searches header
- still need to remove column maybe??
- change keyword search to use full text search so entire phrase doesnt have to match
- infinite scroll keyword search results
- handle unfound article, author, category, archive year
- set order for author results in search

#### 4/12 styling fixes
- Make search box vertically centered
- Get rid of black box around suggested
- Increase spacing between articles in most viewed column
- Footer needs to render across entire screen
- Archive renders poorly on smaller screens
- Featured image gets stretched out on large screens

#### 4/11 
- cleaned up sidebar on issue page for issues and topicals
- displays issue num and date for issue or year for topicals 
- reverse direction of archive year list (and fix how recent year is picked)
- add breadcrumbs to issue page
- breadcrumb archive link goes back to correct year
- added year to issues headline on archive page
- setup to be able to update views count when article is loaded (currently commented out in article.model)
- fixed authorBios not loading on about page
- breadcrumbs: took out from about, archive, join us, added to category, mad home clickable from article
- switch to displaying issue number not issue id

#### 4/10
- support for topical articles in the archives
- lists entry for topical articles in the list of issues, if applicable
- clicking on it uses issues.hbs template, but without the featured section, just list of articles

#### 4/9
- infinite scroll stops sending requests when articles run out
- changed to preload 15 then get 10 at a time
- added infinite scroll to category pages

#### CMS Frontend Notes
- Current functionality
    - Dashboard
        - "Article" link under create directs to write_new
        - "Article" link under edit directs to edit
    - Edit
        - Published and/or draft articles listed
        - Clicking an article directs to write_new
        - "Write new" button directs to write_new
- TODO for backend
    - dashboard.hbs
        - Fill in href values depending on which links you want to use
        - Note: can take out some if we don't use them, like ones having to do with issues
    - dashboard.js
        - Handle logout
    - edit.js
        - Replace static values with values gotten from database queries
    - login.js
        - Handle login v

#### 04/08 
- added login, dashboard, and edit pages
- implemented routing and links between pages
- restyled write_new to match

#### 4/8
- package for doing social media sharing
- facebook + twitter error bc hosting locally - need to setup hosting before testing those
- added meta tags for displaying preview nicely (need hosting to test if they work)
- change home queries to also sort by id to make paged queries work
- infinite scroll on home page (still need to fix behavior when runs out of articles)

#### 4/7
- removed subscribe bar (maybe need to change spacing around search bar now?)
- conditional rendering if inputType set to html (think it worked for everything using 3 braces but made if statement to check in case)
- fixed ordering or archive years 2011 and error when only 1 article in issue (some of 2011's seem like test issues?)
- changed most viewed cutoff year to 2018

#### 4/5 
- updated editnoser.sql to fix some symbols I missed last time
- also added columns to authors table for authorImage and authorBio
- alter author page setup to use database image/bio values if present
- home page link now works from issue page
- added suggested articles to article page (takes 6 most recent in same category)
- added author socials to db - set to only render on page if they exist (so atm none are there)

#### 4/4 
- assign underline styling to the correct category name for the navbar
- added folder with the images temporarily so we can see what it looks like
- some look kinda funny bc the caption is included with the image
- some of them have independent captions - maybe need some kind of setup for using those

#### 04/01
- fixed archive display
- added author search results display
- added ARIA landmarks to all pages
- wrote outline of how category underlining could be done

#### 3/30 home page articles
- has featured article and recent articles ordered by date
- for now the featured article is the featured article in the most recent issue - maybe can change this to something that can be specifically set by the noser later
- also for now am just loading 30 recent articles - should change to make infinite scroll

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
- create new database (named noser_edit or change value in the config)
- use editnoser.sql to load the database (run from where where mysql is installed: mysql -u root -p noser_edited < "path\to\sqlfile")