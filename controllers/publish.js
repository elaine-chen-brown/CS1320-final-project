const Draft = require("../app/models/draft.model.js");

const { response } = require("express");

//display the page, with list of unpublished articles as well as date picker
function display(req, res) {
    var getDrafts = function getDrafts(req, res) {
        return new Promise((resolve, reject) => {
            Draft.getAll((err, data) => {
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
        res.render('publish', {
            title: 'Publish',
            message: '',
            drafts: drafts
        });
    }).catch(error => {
        console.log(error);
    })
}



//push all articles to db, remove from drafts
function publish(req, res) {
    var drafts = req.body.draft;
    var publishIssue = function publishIssue(req, res) {
        return new Promise((resolve, reject) => {
            //For each article, Draft.publish
        })
    }
    var publishTopical = function publishTopical(req, res) {
        return new Promise((resolve, reject) => {
            //Draft.publish
        })
    }
}

module.exports = {
    display,
    publish
}