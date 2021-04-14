const Draft = require("../app/models/draft.model.js");

const { response } = require("express");
const Issue = require("../app/models/issue.model.js");

//display the page, with list of unpublished articles
function display(req, res) {
    
    var getIssue = function getIssue() {
        return new Promise((resolve, reject) => {
            Draft.getIssue((err, data) => {
                if (err) {
                    if (err.kind === "no_drafts") {
                        res.render('publish_issue', {
                            title: 'Publish', 
                            message: 'No drafts',
                            canPublish: false
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

    getIssue().then(result => {
        let drafts = result.map(buildList);
        res.render('publish_issue', {
            title: 'Publish',
            message: '',
            articles: drafts,
            canPublish: true
        });
    }).catch(error => {
        console.log(error);
    })
}

//push all articles to db, remove from drafts
function publishIssue(req, res) {
    var leadid = req.body.featured;

    var getIssue = function getIssue(req, res) {
        return new Promise((resolve, reject) => {
            Draft.getIssue((err, data) => {
                if (err) {
                    console.log(err);
                    reject("unable to retrieve drafts");
                }
                else {
                    resolve(data);
                }
            })
        })
    }

    var getIssueNum = function getIssueNum() {
        return new Promise((resolve, reject) => {
            Issue.getLatest((err, data) => {
                if (err) {
                    reject("unable to get issue number");
                }
                else {
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
                if (err) {
                    reject("unable to publish issue");
                }
                else {
                    resolve(data);
                }
            })
        })
    }

    getIssueNum().then(result => {
        result = JSON.parse(JSON.stringify(result))[0];
        var issueid = parseInt(result.latestid) + 1;
        var date = new Date().getTime();
        console.log(leadid);

        getIssue().then(drafts => {
            drafts.forEach(draft => {
                articleid = draft.articleid;
                /*
                publish(articleid, issueid, date).then(success => {
                    res.render('publish_issue', {
                        title: 'Publish',
                        message: 'Article successfully published!'
                    })
                }) //catch
                */
            });
            /*
            pushIssue(issueid, leadid, date).then(success => {
                res.render('publish_issue', {
                    title: 'Publish',
                    message: 'Issue successfully published!'
                })
            }) //catch
            */
        })
    }) //catch
}

module.exports = {
    display,
    publishIssue
}