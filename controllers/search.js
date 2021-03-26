// Controller handler to handle functionality in search page

const { response } = require("express");

function getSearch(request, response){
  response.render('search', {
    title: 'Search',
    searchResults: searchResults,
    popularSearches: popularSearches
  });
}

// TO DO: write an event handler for the search form (in search.hbs)

// TO DO: replace with values gotten from database queries
let searchResults = [
  {
    articleImage: "/images/list-test.png",
    articleTitle: "This is the title of the first search result!",
    articleBlurb: "Here is the blurb about this article. Wow I wonder what it's about, it must be so so so so cool",
    articleLink: "#",
  },
  {
    articleImage: "/images/list-test.png",
    articleTitle: "This is the title of the second search result!",
    articleBlurb: "Here is the blurb about this article. Wow I wonder what it's about, it must be so so so so cool",
    articleLink: "#",
  },
]

// TO DO: replace with values gotten from database queries
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