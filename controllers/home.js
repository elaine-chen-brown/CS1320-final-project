// Controller handler to handle functionality in home page

const { response } = require("express");

// handle a get request at '/' endpoint.
function getHome(request, response){
  let featuredPic = "images/featured.png";
  let featuredTitle = "Lorem ipsum sit consectetur adipiscing elit sed do";
  let featuredCategory = "FEATURED CATEGORY";
  let featuredBlurb = "This is the featured blurb and what the featured article is about. It's so cool please read it."
  let featuredLink = "#";
  response.render('home', {
    title: 'Home',
    featuredPic: featuredPic,
    featuredTitle: featuredTitle,
    featuredCategory: featuredCategory,
    featuredBlurb: featuredBlurb,
    featuredLink: featuredLink
  });
}

module.exports = {
    getHome
};