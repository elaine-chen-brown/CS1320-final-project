const Author = require("../app/models/author.model.js");

const { response } = require("express");

function display(req, res) {

    res.render('new_author', {
        title: 'New Author'
    })
}

function newAuthor(req, res) {

    var saveAuthor = function saveAuthor(info) {
        return new Promise((resolve, reject) => {
            Author.newAuthor(info, (err, data) => {
                if (err) {
                    reject('error');
                }
                else {
                    resolve(data);
                }
            })
        })
    }

    saveAuthor(req.body).then(result => {
        res.render('new_author', {
            title: 'New Author',
            message: 'Successfully created new author profile!'
        })
    }).catch(error => {
        console.log(error);
        res.render('new_author', {
            title: 'New Author',
            message: 'Error saving new author profile, please try again'
        })
    })
}

module.exports = {
    display,
    newAuthor
}