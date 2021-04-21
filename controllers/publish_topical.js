const Draft = require("../app/models/draft.model.js");

const { response } = require("express");

//display the page, with list of unpublished articles as well as date picker
function display(req, res) {
    if (req.session.loggedin) {
        var getDrafts = function getDrafts() {
            return new Promise((resolve, reject) => {
                Draft.getAllTopical((err, data) => {
                    if (err) {
                        if (err.kind === "no_drafts") {
                            res.render('publish_topical', {
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

        getDrafts().then(result => {
            let drafts = result.map(buildList);
            res.render('publish_topical', {
                title: 'Publish',
                message: '',
                drafts: drafts,
                canPublish: true
            });
        }).catch(error => {
            console.log(error);
        })
    } else {
		res.send('Please login to view this page!');
	}
}


function publishTopical(req, res) {
    if (req.session.loggedin) {
        var drafts = req.body.draft;
        if (typeof drafts == 'string') {
            drafts = [parseInt(drafts)];
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

        var date = Math.round(new Date().getTime() / 1000);
        var issueid = 0;
        drafts.forEach(articleid => {
            articleid = parseInt(articleid);
            publish(articleid, issueid, date).then(success => {
                console.log("published article");
            }).catch(error => {
                res.render('publish_topical', {
                    title: 'Publish',
                    message: 'Error publishing articles'
                })
            })
        })
        res.render('publish_topical', {
            title: 'Publish',
            message: 'Article(s) published successfully!',
        })
    } else {
		res.send('Please login to view this page!');
	}
}

module.exports = {
    display,
    publishTopical
}