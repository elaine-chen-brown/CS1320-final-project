// Controller handler to handle functionality in an article page

const { response } = require("express");

// handle a get request at '/article/:articleId' endpoint.
function getArticle(request, response){
  // TO DO: replace with values gotten from database queries
  let articleTitle = "This is the title of the article";
  let articleByline = "AUTHOR BYLINE";
  let articleDate = "2nd March 2021";
  let photoCaption = "Photo caption";
  // Note: you might have to loop over the article and create new <p> elements for each paragraph, since I don't think HTML recognizes newline characters
  let articleText = "Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Nec ullamcorper sit amet risus nullam eget felis eget. Eget magna fermentum iaculis eu non diam phasellus. Viverra ipsum nunc aliquet bibendum enim. Ut ornare lectus sit amet est. Congue quisque egestas diam in arcu. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus. In hac habitasse platea dictumst vestibulum."
  response.render('article', {
    title: 'Article',
    articleTitle: articleTitle,
    articleByline: articleByline,
    articleDate: articleDate, 
    photoCaption: photoCaption,
    articleText: articleText,
    suggestedArticles: suggestedArticles
  });
}

// TO DO: replace with values gotten from database queries
let suggestedArticles = [
  {
    articleImage: "/images/suggested-pic.png",
    articleLink: "#",
    articleTitle: "This is the title of a suggested article",
    articleDate: "2nd March 2021"
  },
  {
    articleImage: "/images/suggested-pic.png",
    articleLink: "#",
    articleTitle: "This is the title of another suggested article",
    articleDate: "2nd March 2021"
  }
]

// TO DO: handle social media sharing when one of the social buttons is clicked

module.exports = {
    getArticle
};