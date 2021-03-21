// Controller handler to handle functionality in home page

const { response } = require("express");

// handle a get request at '/' endpoint.
function getAuthor(request, response) {
  let aName = "TAYLOR SWIFT"; //request.params.authorName;
  let aBlurb = "This is a blurb about me as an author.";
  let twitterHandle = "@taylorswift";
  let instaHandle = "@taylorswift"
  response.render('author', {
    title: 'Author',
    aName: aName,
    aBlurb: aBlurb,
    twitterHandle: twitterHandle,
    instaHandle: instaHandle
  });
}


module.exports = {
    getAuthor
};