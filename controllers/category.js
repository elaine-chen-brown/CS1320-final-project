// Controller handler to handle functionality in a category page
const Category = require("../app/models/category.model.js");
const Article = require("../app/models/article.model.js");
const Home = require("../app/models/home.model.js");

const { response } = require("express");

function getCategory(req, res){
    console.log(req.params.categoryId);
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
            console.log("found category");
            //console.log(data);
            
            // gets all the article ids from one category
            var findArticleIds = function getArticleIds(entry) {
                return new Promise((resolve, reject) => {
                    Category.findArticleIds(entry.sectionid, (err, data) => {
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
            // get information for one article based on id
            var findArticle = function getArticleById(entry) {
                return new Promise((resolve, reject) => {
                    Article.findById(entry.articleid, (err, data) => {
                        if (err) {
                            if (err.kind === "not_found") {
                                reject(`Not found Article with id ${entry.articleid}.`);
                            } else {
                                reject("Error retrieving Article with id " + entry.articleid);
                            }
                        }
                        else {
                            // TODO add images
                            article_to_add = {
                                articleImage: "/images/list-test.png",
                                articleTitle: data.headline,
                                articleBlurb: data.teaser,
                                articleLink: `/article/${entry.articleid}`,
                                publishDate: data.publishDate
                            }
                            resolve(article_to_add);
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
            findArticleIds(data).then(ids => {
                var actions = ids.map(findArticle);
                var results = Promise.all(actions);
                results.then(articleData => {
                    findPopularArticles().then(popularArticles => {
                        var buildArticle = function buildArticle(articleEntry){
                            article_to_add = {
                                articleImage: "/images/list-test.png",
                                articleTitle: articleEntry.headline,
                                articleLink: `/article/${articleEntry.articleid}`,
                                articleCategory: articleEntry.section
                            }
                            return article_to_add;
                        }
                        let mostViewedArticles = popularArticles.map(buildArticle);
                        // for now fill in featured as first article
                        let featuredPic = "/images/sports.png";
                        let featuredTitle = articleData[0].articleTitle;
                        let featuredCategory = data.section;
                        let featuredBlurb = articleData[0].articleBlurb;
                        let featuredLink = articleData[0].articleLink;
                        // styling for each category
                        let business = "text-decoration:underline"; // TO DO: change back to "", this is for visualization purposes
                        let sectionNames = ["Business", "Campus Life", "Cinema Corner", "Off Campus", "News In Pictures", "Opinion", "Politics", "Science & Technology", "Sports"];
                        // set underline for the entry with the correct section name
                        let sectionStyle = sectionNames.map(name => (name == data.section) ? "text-decoration:underline" : "");
                        res.render('category', {
                            title: data.section, 
                            featuredPic: featuredPic,
                            featuredTitle: featuredTitle,
                            featuredCategory: featuredCategory,
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
                })
            })
        }
    })
}

// handle a get request at '/category' endpoint.
// function getCategory(request, response){
//   // TO DO: replace with values gotten from database queries
//   let featuredPic = "/images/sports.png";
//   let featuredTitle = "Lorem ipsum sit consectetur adipiscing elit sed do";
//   let featuredCategory = "FEATURED CATEGORY";
//   let featuredBlurb = "This is the featured blurb and what the featured article is about. It's so cool please read it."
//   let featuredLink = "/article";
//   response.render('category', {
//     title: 'Category', // TO DO: Replace with name of actual category endpoint
//     featuredPic: featuredPic,
//     featuredTitle: featuredTitle,
//     featuredCategory: featuredCategory,
//     featuredBlurb: featuredBlurb,
//     featuredLink: featuredLink,
//     listArticles: listArticles,
//     mostViewedArticles: mostViewedArticles
//   });
// }

// TO DO: replace with values gotten from database queries
// let listArticles = [
//   {
//     articleImage: "/images/list-test.png",
//     articleTitle: "This is the title of the first article shown!",
//     articleBlurb: "Here is the blurb about this article. Wow I wonder what it's about, it must be so so so so cool",
//     articleLink: "/article",
//   },
//   {
//     articleImage: "/images/list-test.png",
//     articleTitle: "This is the title of the second article shown!",
//     articleBlurb: "Here is the blurb about this article. Wow I wonder what it's about, it must be so so so so cool",
//     articleLink: "/article",
//   },
// ]

// TO DO: replace with values gotten from database queries
// Note: you might want to limit the number of characters shown for mostViewedArticle blurbs, as Angela's mockups showed them being shorter than listArticles
// let mostViewedArticles = [
//   {
//     articleImage: "/images/sidebar.png",
//     articleCategory: "COOL CATEGORY",
//     articleTitle: "This is the title of a most viewed article",
//     articleLink: "/article"
//   },
//   {
//     articleImage: "/images/sidebar.png",
//     articleCategory: "COOL CATEGORY",
//     articleTitle: "This is also the title of a most viewed article",
//     articleLink: "/article"
//   }
// ]


module.exports = {
    getCategory
};