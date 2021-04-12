// Controller handler to handle functionality in search page
const Search = require("../app/models/search.model.js");
const Article = require("../app/models/article.model.js");
const Author = require("../app/models/author.model.js");

const { response } = require("express");

function getSearch(req, res){
    var searchTerm = req.query.search;

    var getAuthorResults = function getAuthorResults() {
        return new Promise((resolve, reject) => {
            Search.findByAuthor(searchTerm, (err, data) => {
                if (err) {
                    if (err.kind == 'not_found') {
                        reject("Not found");
                    }
                    else {
                        reject("Error retrieving search results with term " + searchTerm);
                    }
                }
                else {
                resolve(data);
                }
            })
        })
    }
    var getSearchResults = function getSearchResults() {
        return new Promise((resolve, reject) => {
            Search.findByKeyword(searchTerm, 0, (err, data) => {
                if (err) {
                    if (err.kind == 'not_found') {
                        reject("Not found");
                    }
                    else {
                        reject("Error retrieving search results with term " + searchTerm);
                    }
                }
                else {
                resolve(data);
                }
            });
        });
    }

    var buildResult = function buildResult(result) {
        result_to_add = {
            articleImage: `/images/images/${result.photoFilename}`,
            articleTitle: result.headline,
            articleLink: `/article/${result.articleid}`,
            articleBlurb: result.teaser
        }
        return result_to_add;
    }

    var buildAuthor = function buildAuthor(result) {
        var title = result.title;
        if (result.isRetired) {
            title = title + " (Retired)";
        }
        author_to_add = {
            authorName: result.author,
            authorLink: `/author/${result.authorid}`,
            authorPic: "images/red.png", 
            authorRole: title
        }
        return author_to_add;
    }

    getSearchResults().then(results => {
        let searchResults = results.map(buildResult);
        getAuthorResults().then(author_results => {
            let authorResults = author_results.map(buildAuthor);
            let resultPhrase = "";
            if ((searchResults.length == 0) && (authorResults.length == 0)){
                resultPhrase = 'No search results found for "' + searchTerm + '"';
            } else {
                resultPhrase = 'Showing search results for "' + searchTerm +'"'
            }
            let articlesExist = (searchResults.length == 0) ? false : true;
            let authorsExist = (authorResults.length == 0) ? false: true;
            let linkSearchTerm = (searchTerm.split(" ")).join("+");
            res.render('search', {
                title: 'Search', 
                searchTerm: resultPhrase,
                authorsExist: authorsExist,
                articlesExist: articlesExist,
                searchResults: searchResults,
                authorResults: authorResults,
                keyword: linkSearchTerm
            });
            // }).catch(error => {
            //     console.log(error);
            //     res.render('search', {
            //         title: 'Search',
            //         searchTerm: resultPhrase,
            //         authorsExist: false,
            //         articlesExist: true,
            //         searchResults: searchResults,
            //         authorResults: ""
            //     });
            // });
        })
    })
    // .catch(error => {
    //     res.render('search', {
    //         title: 'Search', 
    //         searchTerm: 'No search results found for "' + searchTerm + '"',
    //         authorsExist: false,
    //         articlesExist: false
    //     });
    // })
}

function loadArticles(request, response) {
    var nextArticles = function getNextArticles(keyword, offset) {
        return new Promise((resolve, reject) => {
            // spaces removed to pass through in link
            let keywordWithSpaces = (keyword.split("+").join(" "));
            Search.findByKeyword(keywordWithSpaces, offset, (err, data) => {
                console.log(offset);
                if (err) {
                    if (err.kind === "not_found") {
                        resolve([]);
                    } else {
                        reject("Error retrieving next articles");
                    }
                }
                else {
                    resolve(data);
                }
            })
        })
    }
    nextArticles(request.params.keyword, parseInt(request.params.offset)).then(articles => {
        response.send(articles);
    })
}

module.exports = {
    getSearch,
    loadArticles
};