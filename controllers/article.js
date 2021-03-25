// Controller handler to handle functionality in home page

const { response } = require("express");

// handle a get request at '/' endpoint.
function getArticle(request, response){
  let articleTitle = "This is the title of the article";
  let articleByline = "AUTHOR BYLINE";
  let articleDate = "2nd March 2021";
  let photoCaption = "Photo caption";
  response.render('article', {
    title: 'Article',
    articleTitle: articleTitle,
    articleByline: articleByline,
    articleDate: articleDate, 
    photoCaption: photoCaption
  });
}

module.exports = {
    getArticle
};