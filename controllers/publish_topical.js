const Draft = require("../app/models/draft.model.js");

const { response } = require("express");

//display the page, with list of unpublished articles as well as date picker
function display(req, res) {

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
}


function publishTopical(req, res) {
    var drafts = req.body.draft;
    if (typeof drafts == 'string') {
        drafts = [parseInt(drafts)];
    }
    //console.log(drafts);
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

    var date = new Date().getTime();
    var issueid = 0;
    drafts.forEach(articleid => {
        articleid = parseInt(articleid);
        publish(articleid, issueid, date).then(success => {
            res.render('publish_topical', {
                title: 'Publish',
                message: 'Article(s) published successfully!',
            })
        })
    })
}

module.exports = {
    display,
    publishTopical
}