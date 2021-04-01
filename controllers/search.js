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
      Search.findByKeyword(searchTerm, (err, data) => {
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
      articleImage: "/images/list-test.png",
      articleTitle: result.headline,
      articleLink: `/article/${result.articleid}`,
      articleBlurb: result.teaser
    }
    return result_to_add;
  }

  var buildAuthor = function buildAuthor(result) {
    author_to_add = {
      authorName: result.author,
      authorLink: `/author/${result.authorid}`,
      // TO DO: replace static values with values from query result
      authorPic: "images/red.png",
      authorRole: "ROLE GOES HERE"
    }
    return author_to_add;
  }

  getSearchResults().then(results => {
    let searchResults = results.map(buildResult);
    getAuthorResults().then(author_results => {
    /*var buildResult = function buildResult(result) {
      result_to_add = {
        articleImage: "/images/list-test.png",
        articleTitle: result.headline,
        articleLink: `/article/${result.articleid}`,
        articleBlurb: result.teaser
      }
      return result_to_add;
    }*/
      let authorResults = author_results.map(buildAuthor);
      res.render('search', {
        title: 'Search', 
        searchTerm: 'Showing search results for "' + searchTerm +'"',
        searchResults: searchResults,
        authorResults: authorResults,
      });
    }).catch(error => {
      res.render('search', {
        title: 'Search',
        searchTerm: 'Showing search results for "' + searchTerm +'"',
        searchResults: searchResults,
        authorResults: ""
      });
    });
  })
  .catch(error => {
    res.render('search', {
      title: 'Search', 
      searchTerm: 'No search results found for "' + searchTerm + '"',
      searchResults: [],
      authorResults: ""
    });
  })
}

// TO DO: replace with values gotten from database queries
let searchResults = [
  {
    articleImage: "/images/list-test.png",
    articleTitle: "This is the title of the first search result!",
    articleBlurb: "Here is the blurb about this article. Wow I wonder what it's about, it must be so so so so cool",
    articleLink: "/article",
  },
  {
    articleImage: "/images/list-test.png",
    articleTitle: "This is the title of the second search result!",
    articleBlurb: "Here is the blurb about this article. Wow I wonder what it's about, it must be so so so so cool",
    articleLink: "/article",
  },
]

// TO DO: replace with values gotten from database queries

// How are we going to keep track of popular searches?
let popularSearches = [
  {
    searchTerm: "Blueno",
    searchLink: "#"
  },
  {
    searchTerm: "Andrews",
    searchLink: "#"
  },
  {
    searchTerm: "Life",
    searchLink: "#"
  }
]

module.exports = {
    getSearch
};