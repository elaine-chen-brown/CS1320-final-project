const Draft = require("../app/models/draft.model.js");
const Category = require("../app/models/category.model.js");

const { response } = require("express");
const { fileupload } = require("express-fileupload");

function display(req, res) {
    if (req.session.loggedin) {
        var getDrafts = function getDrafts() {
            return new Promise((resolve, reject) => {
                Draft.getAll((err, data) => {
                    if (err) {
                        if (err.kind == "no_drafts") {
                            res.render('edit_article', {
                                title: 'Edit Article',
                                message: 'No drafts'
                            });
                        }
                        else {
                            reject("error");
                        }
                    }
                    else {
                        resolve(data);
                    }
                })
            })
        }

        var buildDraftsList = function buildDraftsList(result) {
            draft_to_add = {
                draftid: result.articleid,
                headline: result.headline,
                author: result.author
            }
            return draft_to_add;
        }

        getDrafts().then(result => {
            console.log(result);
            let draftsList = result.map(buildDraftsList);
            res.render('edit_article', {
                title: 'Edit Article',
                drafts: draftsList,
                search: true
            })
        }).catch(error => {
            console.log(error);
        })
    }
    else {
		res.send('Please login to view this page!');
	}
}

function displayDraft(req, res, articleid, message) {
    var getDetails = function getDetails(articleid) {
        return new Promise((resolve, reject) => {
            Draft.findById(articleid, (err, data) => {
                if (err) {
                    if (err.kind == "no_drafts") {
                        res.render('edit_article', {
                            title: 'Edit Article',
                            message: 'No drafts'
                        })
                    }
                    else {
                        reject('error');
                    }
                }
                else {
                    resolve(data);
                }
            })
        })
    }

    getDetails(articleid).then(result => {
        result = JSON.parse(JSON.stringify(result))[0];
        res.render('edit_article', {
            title: 'Edit Article',
            draftid: result.articleid,
            headline: result.headline,
            author: result.author,
            draftBody: result.body,
            teaser: result.teaser,
            found: true,
            search: false,
            message: message
        })
    }).catch(error => {
        console.log(error);
    })
}

function editDraft(req, res) {
    if (req.session.loggedin) {
        var articleid = req.body.editDraft;
        displayDraft(req, res, articleid, '');
    }
    else {
		res.send('Please login to view this page!');
	}
}

function saveChanges(req, res) {
    if (req.session.loggedin) {
        var saveDraft = function saveDraft() {
            return new Promise((resolve, reject) => {
                Draft.editDraft(req.body, (err, data) => {
                    if (err) {
                        reject('error saving changes');
                    }
                    else {
                        resolve(data);
                    }
                })
            })
        }

        saveDraft().then(saved => {
            let articleid = req.body.id;
            displayDraft(req, res, articleid, 'Successfully saved changes!');
        }).catch(error => {
            console.log(error);
            res.render('edit_article', {
                title: 'Edit Article',
                message: 'Error saving changes',
                found: true
            })
        })
    }
    else {
		res.send('Please login to view this page!');
	}
}

module.exports = {
    display,
    editDraft,
    saveChanges
}