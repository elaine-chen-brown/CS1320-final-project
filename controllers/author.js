// Controller handler to handle functionality in home page

const { response } = require("express");

// handle a get request at '/' endpoint.
function getAuthor(request, response) {
  let authorName = "Taylor Swift"; //request.params.authorName;
  let authorPicture = "images/red.png";
  let authorBlurb = "This is a blurb about me as an author.";
  let twitterHandle = "@taylorswift";
  let instaHandle = "@taylorswift"
  response.render('author', {
    title: 'Author',
    authorName: authorName,
    authorPicture: authorPicture,
    authorBlurb: authorBlurb,
    twitterHandle: twitterHandle,
    instaHandle: instaHandle
  });
}


module.exports = {
    getAuthor
};