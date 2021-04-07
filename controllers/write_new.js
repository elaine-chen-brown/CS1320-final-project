const New = require("../app/models/write_new.model.js");

const { response } = require("express");

//TODO
function display(req, res) {
    //get categories
    res.render('write_new', {
        title: 'New article',
        message: '',
        categories: //
    })
}

function handleNew(req, res) {
    console.log(req.body);
    //pass along req.body to New.save
    //res.render that Article has been saved
    var saveDraft = function saveDraft() {
        returrn new Promise((resolve, reject) => {
            New.save(req.body, (err, data) => {
                if (err) {
                    reject("unable to save draft");
                }
                else {
                    resolve(data);
                }
            })
        })
    }
    saveDraft().then(results => {
        res.render('write_new', {
            title: 'New article',
            message: 'Draft saved successfully!'
        })
    }).catch(error => {
        res.render('write_new', {
            title: 'New article',
            message: 'Unable to save, please try again.'
        })
    })
}

module.exports = {
    display,
    handleNew
};