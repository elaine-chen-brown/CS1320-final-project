// Controller handler to handle functionality in a category page

const { response } = require("express");

// handle a get request at '/category' endpoint.
function getCategory(request, response){
  // TO DO: replace with values gotten from database queries
  let featuredPic = "images/sports.png";
  let featuredTitle = "Lorem ipsum sit consectetur adipiscing elit sed do";
  let featuredCategory = "FEATURED CATEGORY";
  let featuredBlurb = "This is the featured blurb and what the featured article is about. It's so cool please read it."
  let featuredLink = "/article";
  response.render('category', {
    title: 'Category', // TO DO: Replace with name of actual category endpoint
    featuredPic: featuredPic,
    featuredTitle: featuredTitle,
    featuredCategory: featuredCategory,
    featuredBlurb: featuredBlurb,
    featuredLink: featuredLink,
    listArticles: listArticles,
    mostViewedArticles: mostViewedArticles
  });
}

// TO DO: replace with values gotten from database queries
let listArticles = [
  {
    articleImage: "/images/list-test.png",
    articleTitle: "This is the title of the first article shown!",
    articleBlurb: "Here is the blurb about this article. Wow I wonder what it's about, it must be so so so so cool",
    articleLink: "/article",
  },
  {
    articleImage: "/images/list-test.png",
    articleTitle: "This is the title of the second article shown!",
    articleBlurb: "Here is the blurb about this article. Wow I wonder what it's about, it must be so so so so cool",
    articleLink: "/article",
  },
]

// TO DO: replace with values gotten from database queries
// Note: you might want to limit the number of characters shown for mostViewedArticle blurbs, as Angela's mockups showed them being shorter than listArticles
let mostViewedArticles = [
  {
    articleImage: "/images/sidebar.png",
    articleCategory: "COOL CATEGORY",
    articleTitle: "This is the title of a most viewed article",
    articleLink: "/article"
  },
  {
    articleImage: "/images/sidebar.png",
    articleCategory: "COOL CATEGORY",
    articleTitle: "This is also the title of a most viewed article",
    articleLink: "/article"
  }
]


module.exports = {
    getCategory
};