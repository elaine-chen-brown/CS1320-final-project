// import dependencies
const express = require('express');
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
var crypto = require('crypto');

// import database connection
const sql = require('./app/models/db.js');

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

// CMS handlers
const loginHandler = require('./controllers/login.js');
const dashboardHandler = require('./controllers/dashboard.js');
const editAuthorHandler = require('./controllers/edit_author.js');
const newAuthorHandler = require('./controllers/new_author.js');
const Author = require("./app/models/author.model.js");


const newHandler = require('./controllers/write_new.js');
const publishTopicalHandler = require('./controllers/publish_topical.js');
const publishIssueHandler = require('./controllers/publish_issue.js');
const deleteHandler = require('./controllers/delete.js');

// set up express app
const app = express();
const port = 8080;

app.use(express.json());
app.use(fileupload());
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
app.get('/author/:authorId', authorHandler.findAuthor); //should probably change this to keyword at some point to have better article links
// app.get('/category', categoryHandler.getCategory); // don't need this anymore I think?
app.get('/category/:categoryId', categoryHandler.getCategory);
app.get('/archive', archiveHandler.getRecentYear);
app.get('/archive/:year', archiveHandler.getArchive);
app.get('/issue/:issueId', issueHandler.getIssue);
app.get('/topical/:year', issueHandler.getTopicalYear)

app.get('/loadNew/:featuredId/:offset', homeHandler.loadArticles);
app.get('/loadCategoryArticles/:categoryId/:offset', categoryHandler.loadArticles);
app.get('/loadAboutAuthors/:offset', aboutHandler.loadAuthors);
app.get('/loadSearchArticles/:keyword/:offset', searchHandler.loadArticles);

// Login Handling
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.get('/login', loginHandler.getLogin);

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	var hashPwd = crypto.createHash('sha1').update(password).digest('hex');
	if (username && password) {
		sql.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, hashPwd], (error, results) => {
            if (error) {
                console.log("error: ", error);
            }
			if (results.length) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/dashboard');
			} else {
                response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/logout', function(request, response) {
	request.session.loggedin = false;
	response.redirect('/login');
});


// CMS endpoints
app.get('/dashboard', dashboardHandler.getDashboard);
app.get('/write_new', newHandler.display);
app.post('/write_new', newHandler.handleNew);
app.get('/publish_issue', publishIssueHandler.display);
app.get('/publish_topical', publishTopicalHandler.display);
app.post('/publish_issue', publishIssueHandler.publishIssue);
app.post('/publish_topical', publishTopicalHandler.publishTopical);
app.get('/delete', deleteHandler.display);
app.post('/delete', deleteHandler.deleteArticle);
app.get('/edit_author', editAuthorHandler.display);
app.post('/edit_author', editAuthorHandler.editAuthor);
app.post('/save_author', editAuthorHandler.saveChanges);
app.get('/new_author', newAuthorHandler.display);
app.post('/new_author', newAuthorHandler.newAuthor);

app.post('/saveImage', async (req, res) => {
    try {
        if (!req.files) {
            console.log("no files");
        }
        else {
            let photo = req.files.myFile;
            photo.mv('./public/images/drafts/' + photo.name);
        }
    } catch (err) {
        console.log("error: ", err);
        res.render('write_new', {
            title: 'New article',
            message: 'Unable to upload image'
        });
    }
});

app.post('/saveAuthorImage', async (req, res) => {
    try {
        if (!req.files) {
            console.log("no files");
        }
        else {
            let photo = req.files.myFile;
            photo.mv('./public/images/authors/' + photo.name);
        }
    } catch (err) {
        console.log("error: ", err);
        res.render('edit_author', {
            title: 'Edit Author',
            message: 'Unable to upload image'
        });
    }
});

// listen on given port
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));