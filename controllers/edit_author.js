const Author = require("../app/models/author.model.js");

const { response } = require("express");

function display(req, res) {

    var getAuthors = function getAuthors() {
        return new Promise((resolve, reject) => {
            Author.getAll((err, data) => {
                if (err) {
                    reject("error");
                }
                else {
                    resolve(data);
                }
            })
        })
    }

    var buildAuthorList = function buildAuthorList(result) {
        author_to_add = {
            authorname: result.author,
            authorid: result.authorid
        }
        return author_to_add;
    }

    getAuthors().then(result => {
        let authorList = result.map(buildAuthorList);
        res.render('edit_author', {
            title: 'Edit Author',
            authors: authorList,
            search: true
        })
    }).catch(error => {
        console.log(error);
    })
}

function displayAuthor(req, res, authorid, message) {
    var getDetails = function getDetails(authorid) {
        return new Promise((resolve, reject) => {
            Author.findById(authorid, (err, data) => {
                if (err) {
                    reject('error');
                }
                else {
                    resolve(data);
                }
            })
        })
    }

    getDetails(authorid).then(result => {
        result = JSON.parse(JSON.stringify(result))[0];
        res.render('edit_author', {
            title: 'Edit Author',
            authorid: authorid,
            authorname: result.author,
            bio: result.authorBio,
            insta: result.authorInsta,
            twitter: result.authorTwitter,
            found: true,
            search: false,
            message: message
        })
    }).catch(error => {
        console.log(error);
    })
}

function editAuthor(req, res) {
    var authorid = req.body.editAuthor;
    displayAuthor(req, res, authorid, '');
}

function saveChanges(req, res) {
    var saveDetails = function saveDetails() {
        return new Promise((resolve, reject) => {
            Author.editAuthor(req.body, (err, data) => {
                if (err) {
                    reject('error saving changes');
                }
                else {
                    resolve(data);
                }
            })
        })
    }

    saveDetails().then(saved => {
        let authorid = req.body.id;
        displayAuthor(req, res, authorid, 'Successfully saved changes!');
    }).catch(error => {
        console.log(error);
        res.render('edit_author', {
            title: 'Edit Author',
            message: 'Error saving changes',
            found: true
        })
    })
}

module.exports = {
    display,
    editAuthor,
    saveChanges
}