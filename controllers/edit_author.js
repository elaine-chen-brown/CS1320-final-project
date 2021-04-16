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

function editAuthor(req, res) {
    var authorid = req.body.editAuthor;

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
            search: false
        })
    }).catch(error => {
        console.log(error);
    })
}

function saveChanges(req, res) {
    console.log(req);
}

module.exports = {
    display,
    editAuthor,
    saveChanges
}