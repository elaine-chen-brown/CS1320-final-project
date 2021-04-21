// Controller handler to handle functionality in a category page
const Category = require("../app/models/category.model.js");
const Article = require("../app/models/article.model.js");
const Home = require("../app/models/home.model.js");

const { response } = require("express");

function getCategory(req, res){
    Category.findById(req.params.categoryId, (err,data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Category with id ${req.params.sectionId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Category with id " + req.params.sectionId
                });
            }
          }
        else {
            
            // gets article from category
            var findArticles = function getArticles(entry) {
                return new Promise((resolve, reject) => {
                    Category.findArticles(entry.sectionid, 0, (err, data) => {
                        if (err) {
                            if (err.kind === "not_found") {
                                reject(`Not found articles from sectionid ${entry.sectionid}.`);
                            } else {
                                reject("Error retrieving Articles from section id " + entry.sectionid);
                            }
                        }
                        else {
                            resolve(data);
                        }
                    })
                })
            }
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
            // first get all the article ids
            findArticles(data).then(mainarticles => {
                findPopularArticles().then(popularArticles => {
                    var buildArticle = function buildArticle(articleEntry){
                        let hasPhoto = (articleEntry.photoFilename) ? true : false;
                        article_to_add = {
                            articleImage: `/images/images/${articleEntry.photoFilename}`,
                            articleTitle: articleEntry.headline,
                            articleLink: `/article/${articleEntry.articleid}`,
                            articleCategory: articleEntry.section,
                            articleBlurb: articleEntry.teaser,
                            hasPhoto: hasPhoto,
                        }
                        return article_to_add;
                    }
                    let mostViewedArticles = popularArticles.map(buildArticle);
                    let articleData = mainarticles.map(buildArticle);
                    // for now fill in featured as first article
                    let featuredPic = articleData[0].articleImage;
                    let hasFeaturedPic = articleData[0].hasPhoto;
                    let featuredTitle = articleData[0].articleTitle;
                    let featuredCategory = data.section;
                    let featuredBlurb = articleData[0].articleBlurb;
                    let featuredLink = articleData[0].articleLink;
                    let featuredCategoryId = req.params.categoryId;
                    // styling for each category
                    let sectionNames = ["Business", "Campus Life", "Cinema Corner", "Off Campus", "News In Pictures", "Opinion", "Politics", "Science & Technology", "Sports"];
                    // set underline for the entry with the correct section name
                    let sectionStyle = sectionNames.map(name => (name == data.section) ? "text-decoration:underline" : "");
                    res.render('category', {
                        title: data.section, 
                        featuredPic: featuredPic,
                        hasFeaturedPic: hasFeaturedPic,
                        featuredTitle: featuredTitle,
                        featuredCategory: featuredCategory,
                        featuredCategoryId: featuredCategoryId,
                        featuredBlurb: featuredBlurb,
                        featuredLink: featuredLink,
                        listArticles: articleData.slice(1,),
                        mostViewedArticles: mostViewedArticles,
                        businessStyle: sectionStyle[0],
                        campusLifeStyle: sectionStyle[1],
                        cinemaCornerStyle: sectionStyle[2],
                        offCampusStyle: sectionStyle[3],
                        newsInPicsStyle: sectionStyle[4],
                        opinionStyle: sectionStyle[5],
                        politicsStyle: sectionStyle[6],
                        sTStyle: sectionStyle[7],
                        sportsStyle: sectionStyle[8]
                    })
                })
            }).catch(error => {
                if (error.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Category with id ${req.params.categoryId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving Category with id " + req.params.categoryId
                    });
                }
            })
        }
    })
}

function loadArticles(request, response) {
    var nextArticles = function getNextArticles(categoryId, offset) {
        return new Promise((resolve, reject) => {
            Category.findArticles(categoryId, offset, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        resolve([]);
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
    nextArticles(parseInt(request.params.categoryId), parseInt(request.params.offset)).then(articles => {
        response.send(articles);
    })
}

module.exports = {
    getCategory,
    loadArticles
};