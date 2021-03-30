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
        // TO DO: replace with values gotten from database queries
        let featuredPic = "images/featured.png";
        let featuredTitle = "Lorem ipsum sit consectetur adipiscing elit sed do";
        let featuredCategory = "FEATURED CATEGORY";
        let featuredBlurb = "This is the featured blurb and what the featured article is about. It's so cool please read it."
        let featuredLink = "/article";
        
        response.render('home', {
            title: 'Home',
            featuredPic: featuredPic,
            featuredTitle: featuredTitle,
            featuredCategory: featuredCategory,
            featuredBlurb: featuredBlurb,
            featuredLink: featuredLink,
            listArticles: listArticles,
            mostViewedArticles: mostViewedArticles
        });
    })
  
}

// TO DO: replace with values gotten from database queries
let listArticles = [
  {
    articleImage: "/images/list-test.png",
    articleTitle: "This is the title of the first article shown!",
    articleBlurb: "Here is the blurb about this article. Wow I wonder what it's about, it must be so so so so cool",
    articleLink: "/article",
  },
  {
    articleImage: "/images/list-test.png",
    articleTitle: "This is the title of the second article shown!",
    articleBlurb: "Here is the blurb about this article. Wow I wonder what it's about, it must be so so so so cool",
    articleLink: "/article",
  },
]

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
    getHome
};