const Draft = require("../app/models/draft.model.js");
const Issue = require("../app/models/issue.model.js");

const { response } = require("express");

//display the page, with list of unpublished articles as well as date picker
function display(req, res) {
    var getDrafts = function getDrafts(req, res) {
        return new Promise((resolve, reject) => {
            Draft.getAll((err, data) => {
                if (err) {
                    if (err.kind === "no_drafts") {
                        res.render('publish_issue', {
                            title: 'Publish', 
                            message: 'No drafts'
                        });
                    }
                    else {
                        console.log(err);
                        reject("unable to retrieve drafts");
                    }
                }
                else {
                    resolve(data);
                }
            })
        })
    }
    
    var buildList = function buildList(result) {
        draft_to_add = {
            articleid: result.articleid,
            author: result.author,
            headline: result.headline
        }
        return draft_to_add;
    }

    getDrafts().then(result => {
        let drafts = result.map(buildList);
        res.render('publish_issue', {
            title: 'Publish',
            message: '',
            drafts: drafts
        });
    }).catch(error => {
        console.log(error);
    })
}

//push all articles to db, remove from drafts
function publishIssue(req, res) {
    var drafts = req.body.draft;

    var getIssue = function getIssue() {
        return new Promise((resolve, reject) => {
            Issue.getLatest((err, data) => {
                if (err) {
                    reject("unable to get latest issue number");
                }
                else {
                    console.log(data);
                    resolve(data);
                }
            })
        })
    }

    var publish = function publish(articleid, issueid, date) {
        return new Promise((resolve, reject) => {
            Draft.publish(articleid, issueid, date, (err, data) => {
                if (err) {
                    reject("unable to publish article");
                }
                else {
                    resolve(data);
                }
            })
        })
    }

    var pushIssue = function pushIssue(issueid, date, leadid) {
        return new Promise((resolve, reject) => {
            Draft.newIssue(issueid, date, leadid, (err, data) => {
                //
            })
        })
    }

    getIssue().then(issuenum => {
        var issueid = issuenum.issueid + 1;
        var date = new Date().getTime();
        drafts.forEach(articleid => {
            console.log(articleid);
            publish(articleid, issueid, date).then(result => {
                res.render('publish_issue', {
                    title: 'Publish',
                    message: 'Issue successfully published!'
                })
            })
        })
        
    })
}

module.exports = {
    display,
    publishIssue
}