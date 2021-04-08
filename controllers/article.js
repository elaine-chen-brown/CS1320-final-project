// Controller handler to handle functionality in an article page
const Article = require("../app/models/article.model.js");

const { response } = require("express");
var moment = require('moment'); 

function processDate(unix_timestamp){
    // put into milliseconds
    var date = new Date(unix_timestamp * 1000);
    return moment(date).format('dddd, MMMM Do, YYYY');
}

// handle a get request at '/article/:articleId' endpoint.
function getArticle(request, response){
  Article.findById(request.params.articleId, (err, data) => {
    if (err) {
        if (err.kind === "not_found") {
            reject(`Not found Article with id ${request.params.articleId}.`);
        } else {
            reject("Error retrieving Article with id " + request.params.articleId);
        }
    }
    else {
        // TODO add images
        var findAuthor = function getAuthor(id) {
            return new Promise((resolve, reject) => {
                Article.getAuthorByArticleId(id, (err, data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            reject(`Not found author for article id ${id}.`);
                        } else {
                            reject("Error retrieving author for Article with id " + id);
                        }
                    }
                    else {
                        resolve(data);
                    }
                })
            })
        }
        var findRelated = function getRelated(articleid, section) {
            return new Promise((resolve, reject) => {
                Article.findRelated(articleid, section, (err, data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            reject(`Not found related for article id ${articleid}.`);
                        } else {
                            reject("Error retrieving related for Article with id " + articleid);
                        }
                    }
                    else {
                        resolve(data);
                    }
                })
            })
        }
        findAuthor(request.params.articleId).then(items => {
            let articleTitle = data.headline;
            let articleAuthor = items[0].author;
            let authorLink = `/author/${items[0].authorid}`;
            // let articleDate = processDate(items[1].publishDate);
            let articleDate = processDate(data.publishDate);
            let photoCaption = data.photoCaption;
            let articleText = data.body;
            let categoryLink = `/category/${data.sectionid}`;
            let articleCategoryName = data.section;
            let articleImage = `/images/images/${data.photoFilename}`;
            let isHTML = (data.inputType == 'html') ? true : false;
            let shareUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
            // let shareTitle = articleTitle.replace(/ /g, "-");
            let shareTitle = articleTitle;
            let fullPhotoUrl = request.protocol + '://' + request.get('host') + articleImage;
            // meta tags for social media preview card
            let socialMetas = "<meta property=\"og:title\" content=\"The Brown Noser\"></meta>" + 
                `<meta property=\"og:description\" content=\"${articleTitle}\">` + 
                `<meta property=\"og:image\" content=${fullPhotoUrl}></meta>` + 
                `<meta property=\"og:url\" content=${shareUrl}></meta>` + 
                "<meta name=\"twitter:card\" content=\"summary_large_image\"></meta>"
            console.log(shareTitle);
            findRelated(request.params.articleId, articleCategoryName).then(related => {
                function processDate(unix_timestamp){
                    // put into milliseconds
                    var date = new Date(unix_timestamp * 1000);
                    return moment(date).format('Do MMMM YYYY');
                }
                var buildArticle = function buildArticle(articleEntry){
                    let date = processDate(articleEntry.publishDate);
                    article_to_add = {
                        articleImage: `/images/images/${articleEntry.photoFilename}`,
                        articleTitle: articleEntry.headline,
                        articleLink: `/article/${articleEntry.articleid}`,
                        articleDate: date
                    }
                    return article_to_add;
                }
                let relatedArticles = related.map(buildArticle);
                response.render('article', {
                    title: 'Article',
                    articleTitle: articleTitle,
                    articleAuthor: articleAuthor,
                    authorLink: authorLink,
                    articleDate: articleDate, 
                    photoCaption: photoCaption,
                    articleText: articleText,
                    suggestedArticles: relatedArticles,
                    categoryLink: categoryLink,
                    articleCategoryName: articleCategoryName,
                    articleImage: articleImage,
                    isHTML: isHTML,
                    shareUrl: shareUrl,
                    shareTitle: shareTitle,
                    socialMetas: socialMetas
                });
            })
        })     
    }
})
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