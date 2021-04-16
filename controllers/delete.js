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

        var deleteDraft = function deleteDraft(articleid) {
            return new Promise((resolve, reject) => {
                Draft.deleteDraft(articleid, (err, data) => {
                    if (err) {
                        reject("error deleting");
                    }
                    else {
                        resolve(data);
                    }
                })
            })
        }

        var deletePublished = function deletePublished(articleid) {
            return new Promise((resolve, rejeect) => {
                Article.deletePublished(articleid, (err, data) => {
                    if (err) {
                        if (err.kind == "cannot_delete_featured") {
                            res.render('delete', {
                                title: 'Delete',
                                message: 'Cannot delete featured article.'
                            })
                        }
                        else {
                            reject("error deleting");
                        }
                    }
                    else {
                        resolve(data);
                    }
                })
            })
        }

        deleteInfo = req.body.toDelete.split(',');
        articleid = deleteInfo[0];
        db = deleteInfo[1];
        console.log(articleid);
        console.log(db);
        if (db == "drafts") {
            deleteDraft(articleid).then(success => {
                res.render('delete', {
                    title: 'Delete',
                    message: 'Successfully deleted article!'
                })
            }).catch(error => {
                res.render('delete', {
                    title: 'Delete',
                    message: 'Could not delete from drafts, please try again.'
                })
            })
        }
        else {
            deletePublished(articleid).then(success => {
                res.render('delete', {
                    title: 'Delete',
                    message: 'Successfully deleted article!'
                })
            }).catch(error => {
                res.render('delete', {
                    title: 'Delete',
                    message: 'Could not delete from articles, please try again.'
                })
            })
        }
        
    }
    else {
		res.send('Please login to view this page!');
	}
}

module.exports = {
    display,
    deleteArticle
}