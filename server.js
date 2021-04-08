// import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');

// import handlers
const homeHandler = require('./controllers/home.js');
const searchHandler = require('./controllers/search.js');
const articleHandler = require('./controllers/article.js');
const aboutHandler = require('./controllers/about.js');
const joinHandler = require('./controllers/join.js');
const authorHandler = require('./controllers/author.js');
const categoryHandler = require('./controllers/category.js');
const archiveHandler = require('./controllers/archive.js');
const issueHandler = require('./controllers/issue.js');

const newHandler = require('./controllers/write_new.js');
const publishHandler = require('./controllers/publish.js');

// set up express app
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/share-buttons.js', (req, res) => {res.sendFile(path.join(__dirname, '/public/share-buttons.js'))});

// handle requests at each endpoint
app.get('/', homeHandler.getHome);
app.get('/search', searchHandler.getSearch);
app.get('search/:searchTerm', searchHandler.getSearch);
app.get('/article', articleHandler.getArticle); // do we need this? 
app.get('/article/:articleId', articleHandler.getArticle);
app.get('/about', aboutHandler.getAbout);
app.get('/join', joinHandler.getJoin);
app.get('/author', authorHandler.getAuthor); 
app.get('/author/:authorId', authorHandler.findAuthor); //should probably change this to keyword at some point to have better article links
// app.get('/category', categoryHandler.getCategory); // don't need this anymore I think?
app.get('/category/:categoryId', categoryHandler.getCategory);
app.get('/archive', archiveHandler.getRecentYear);
app.get('/archive/:year', archiveHandler.getArchive);
app.get('/issue/:issueId', issueHandler.getIssue);

app.get('/write_new', newHandler.display);
app.post('/write_new', newHandler.handleNew);
app.get('/publish', publishHandler.display);
app.post('/publish_issue', publishHandler.publishIssue);
app.post('publish_topical', publishHandler.publishTopical);

// listen on given port
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));