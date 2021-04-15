const Draft = require("../app/models/draft.model.js");
const Article = require("../app/models/article.model.js");

const { response } = require("express");

function display(req, res) {
    if (req.session.loggedin) {

        var getDrafts = function getDrafts() {
            return new Promise((resolve, reject) => {
                Draft.getAll((err, data) => {
                    if (err) {
                        return;
                    }
                    else {
                        resolve(data);
                    }
                })
            })
        }

        var getPublished = function getPublished() {
            return new Promise((resolve, reject) => {
                Article.getAll((err, data) => {
                    if (err) {
                        return;
                    }
                    else {
                        resolve(data);
                    }
                })
            })
        }

        var buildDraftsList = function buildDraftsList(result) {
            draft_to_add = {
                articleid: result.articleid,
                headline: result.headline,
                db: 'drafts'
            }
            return draft_to_add;
        }

        var buildArticlesList = function buildArticlesList(result) {
            article_to_add = {
                articleid: result.articleid,
                headline: result.headline,
                db: 'articles'
            }
            return article_to_add;
        }

        getDrafts().then(drafts => {
            getPublished().then(published => {
                let draftsList = drafts.map(buildDraftsList);
                let articlesList = published.map(buildArticlesList);
                let all = draftsList.concat(articlesList);
                res.render('delete', {
                    title: 'Delete',
                    articles: all,
                    message: ''
                })
            })
        })
    }
    else {
		res.send('Please login to view this page!');
	}
}

function deleteArticle(req, res) {
    if (req.session.loggedin) {
        //get articleid and what db it belongs to then call appropriate delete function
        console.log(req.body.articleToDelete);
    }
    else {
		res.send('Please login to view this page!');
	}
}