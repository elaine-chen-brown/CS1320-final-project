const Draft = require("../app/models/draft.model.js");
const Category = require("../app/models/category.model.js");
const Author = require("../app/models/author.model.js");

const { response } = require("express");
const { fileupload } = require("express-fileupload");

function display(req, res) {
    //if (req.session.loggedin) {
        var getCategories = function getCategories(req, res) {
            return new Promise((resolve, reject) => {
                //should ideally get account id from req -- do we even need different accounts?
                Category.getAll(3, (err, data) => {
                    if (err) {
                        reject("unable to get categories");
                    }
                    else {
                        resolve(data);
                    }
                })
            })
        }

        var getAuthors = function getAuthors(req, res) {
            return new Promise((resolve, reject) => {
                Author.getAllActive((err, data) => {
                    if (err) {
                        reject("unable to get authors");
                    }
                    else {
                        resolve(data);
                    }
                })
            })
        }

        var buildCategoryList = function buildCategoryList(result) {
            result_to_add = {
                category: result.section,
                categoryid: result.sectionid
            }
            return result_to_add;
        }

        var buildAuthorList = function buildAuthorList(result) {
            author_to_add = {
                authorname: result.author,
                authorid: result.authorid
            }
            return author_to_add;
        }
        getCategories().then(results => {
            getAuthors().then(authorResults => {
                let categories = results.map(buildCategoryList);
                let authors = authorResults.map(buildAuthorList);
                res.render('write_new', {
                    title: 'New article',
                    message: '',
                    categories: categories,
                    authors: authors
                })
            }).catch(error => {
                console.log("error fetching authors");
            })
        }).catch(error => {
            console.log("error fetcing categories");
        })
    // } else {
	// 	res.send('Please login to view this page!');
	// }
}

function handleNew(req, res) {
    //if (req.session.loggedin) {
        console.log(req.body);
        var saveDraft = function saveDraft() {
            return new Promise((resolve, reject) => {
                Draft.save(req.body, (err, data) => {
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
    // } else {
	// 	res.send('Please login to view this page!');
	// } 
}

module.exports = {
    display,
    handleNew
};