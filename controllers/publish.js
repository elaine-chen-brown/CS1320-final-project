const Publish = require("../app/models/publish.model.js");

const { response } = require("express");
const Draft = require("../app/models/draft.model.js");

//display the page, with list of unpublished articles as well as date picker
function display(req, res) {
    var getArticles = function getArticles(req, res) {
        return new Promise((resolve, reject) => {
            Draft.getAll((err, data) => {
                if (err) {
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
            title: result.title //or should it be headline?
        }
        return draft_to_add;
    }

    getArticles().then(result => {
        let drafts = result.map(buildList);
        res.render({
            title: 'Publish',
            message: '',
            drafts: drafts
        })
    }).catch(error => {
        console.log("error fetching drafts");
    })
}

//push all articles to db, remove from drafts
function publish(req, res) {
    //TODO
}

module.exports = {
    display,
    publish
}