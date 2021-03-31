// Controller handler to handle functionality in search page
const Search = require("../app/models/search.model.js");
const Article = require("../app/models/article.model.js");
const Author = require("../app/models/author.model.js");

const { response } = require("express");

function getSearch(req, res){
  var searchTerm = req.query.search;
  console.log(searchTerm);

  // TODO: add a check for whether we are searching by keyword or author name
  // + minimum string input length?

  // Search by keyword
  Search.findByKeyword(searchTerm, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        //display text that says that no results found for ___ 
        //underneath, recommended articles (popular ones?)
      }
      else {
        res.status(500).send({
          message: "Error retrieving search results for " + searchTerm
        });
      }
    }
    else {
      console.log("searching");
      console.log(data);

      //TODO: render response based on results
    }
  });

  // Search by author: will need to do an additional 

  /* res.render('search', {
    title: 'Search', //seems to be missing from hbs file 
    searchResults: searchResults,
    popularSearches: popularSearches
  }); */
}

// TO DO: write an event handler for the search form (in search.hbs)

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