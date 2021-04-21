// Controller handler to handle functionality in home page
const Home = require("../app/models/home.model.js");

const { response } = require("express");

// handle a get request at '/' endpoint.
function getHome(request, response){
    var findPopularArticles = function getPopularArticles() {
        return new Promise((resolve, reject) => {
            // get 5 most popular articles
            Home.findMostViewed(5, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        reject(`Not found popular articles`);
                    } else {
                        reject("Error retrieving popular articles");
                    }
                }
                else {
                    resolve(data);
                }
            })
        })
    }
    var findTopFeatured = function getTopFeatured() {
        return new Promise((resolve, reject) => {
            Home.findRecentFeatured((err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        reject(`Not found recent featured`);
                    } else {
                        reject("Error retrieving recent featured");
                    }
                }
                else {
                    resolve(data);
                }
            })
        })
    }
    var findOtherArticles = function getOtherArticles(featuredEntry) {
        return new Promise((resolve, reject) => {
            Home.findRecentArticles(featuredEntry, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        reject(`Not found recent articles`);
                    } else {
                        reject("Error retrieving recent articles");
                    }
                }
                else {
                    resolve(data);
                }
            })
        })
    }
    findPopularArticles().then(popularArticles => {
        findTopFeatured().then(featuredArticle => {
            findOtherArticles(featuredArticle.articleid).then(otherArticles => {
                var buildArticle = function buildArticle(articleEntry){
                    let hasPhoto = (articleEntry.photoFilename) ? true : false;
                    article_to_add = {
                        articleImage: `/images/images/${articleEntry.photoFilename}`,
                        articleTitle: articleEntry.headline,
                        articleLink: `/article/${articleEntry.articleid}`,
                        articleCategory: articleEntry.section,
                        articleBlurb: articleEntry.teaser,
                        hasPhoto: hasPhoto
                    }
                    return article_to_add;
                }
                let mostViewedArticles = popularArticles.map(buildArticle);
                let listArticles = otherArticles.map(buildArticle);
                let featuredPic = `/images/images/${featuredArticle.photoFilename}`;
                let hasFeaturedPic = (featuredArticle.photoFilename) ? true : false;
                let featuredTitle = featuredArticle.headline;
                let featuredCategory = featuredArticle.section;
                let featuredBlurb = featuredArticle.teaser;
                let featuredLink = `/article/${featuredArticle.articleid}`;
                
                response.render('home', {
                    title: 'Home',
                    featuredPic: featuredPic,
                    hasFeaturedPic: hasFeaturedPic,
                    featuredTitle: featuredTitle,
                    featuredCategory: featuredCategory,
                    featuredBlurb: featuredBlurb,
                    featuredLink: featuredLink,
                    listArticles: listArticles,
                    mostViewedArticles: mostViewedArticles
                });
            })
            
        })
    })
  
}

function loadArticles(request, response) {
    var nextArticles = function getNextArticles(featuredId, offset) {
        return new Promise((resolve, reject) => {
            Home.findNextArticleSet(featuredId, offset, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        resolve([]);
                        reject(`Not found next articles`);
                    } else {
                        reject("Error retrieving next articles");
                    }
                }
                else {
                    resolve(data);
                }
            })
        })
    }
    nextArticles(parseInt(request.params.featuredId), parseInt(request.params.offset)).then(articles => {
        response.send(articles);
    })
}

module.exports = {
    getHome,
    loadArticles
};