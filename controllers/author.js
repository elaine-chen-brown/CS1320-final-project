// Controller handler to handle functionality in an author page

const { response } = require("express");

// handle a get request at '/author/:authorName' endpoint.
function getAuthor(request, response) {
  // TO DO: replace with values gotten from database queries
  let authorName = "Taylor Swift"; //request.params.authorName;
  let authorPicture = "images/red.png";
  let authorBlurb = "This is a blurb about me as an author.";
  let instaHandle = "@taylorswift";
  let instaLink = "#";
  let twitterHandle = "@taylorswift";
  let twitterLink = "#";
  response.render('author', {
    title: 'Author',
    authorName: authorName,
    authorPicture: authorPicture,
    authorBlurb: authorBlurb,
    instaHandle: instaHandle,
    instaLink: instaLink,
    twitterHandle: twitterHandle,
    twitterLink: twitterLink,
    authorArticles: authorArticles
  });
}

// TO DO: replace with values gotten from database queries
let authorArticles = [
  {
    articleImage: "/images/list-test.png",
    articleTitle: "This is the title of the author's first article",
    articleBlurb: "This is the blurb of the author's first article. What a cool article! I'm so into it!!!",
    articleLink: "/article"
  },
  {
    articleImage: "/images/list-test.png",
    articleTitle: "This is the title of the author's second article",
    articleBlurb: "This is the blurb of the author's second article. What a cool article! I'm so into it!!!",
    articleLink: "/article"
  }
]

module.exports = {
    getAuthor
};