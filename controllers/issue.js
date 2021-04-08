// Controller handler to handle functionality in search page
const Article = require("../app/models/article.model.js");
const Issue = require("../app/models/issue.model.js");

const { response } = require("express");
var moment = require('moment'); 

function getIssue(req, res){
    // get the featured article id
    Issue.findFeaturedArticleId(req.params.issueId, (err,data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Issue with id ${req.params.issueId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Issue with id " + req.params.issueId
                });
            }
        }
        else {
            console.log(data);
            var findLeadArticle = function getLeadArticle(entry) {
                return new Promise((resolve, reject) => {
                    Article.findById(entry.leadStory, (err, data) => {
                        if (err) {
                            if (err.kind === "not_found") {
                                reject(`Not found lead article from id ${entry.leadStory}.`);
                            } else {
                                reject("Error retrieving lead Article from id " + entry.leadStory);
                            }
                        }
                        else {
                            resolve(data);
                        }
                    })
                })
            }
            // returns all article data for all non-lead articles
            var findNonLeadArticles = function getNonLeadArticles(entry) {
                return new Promise((resolve, reject) => {
                    Issue.findNonFeaturedArticles(entry.leadStory, req.params.issueId, (err, data) => {
                        if (err) {
                            if (err.kind === "not_found") {
                                reject(`Not found articles from issue id ${req.params.issueId}.`);
                            } else {
                                reject("Error retrieving articles from issue id " + req.params.issueId);
                            }
                        }
                        else {
                            resolve(data);
                        }
                    })
                })
            }
            //TODO  deal with if featured article is null
            findLeadArticle(data).then(leadArticle => {
                findNonLeadArticles(data).then(otherArticles => {
                    var buildArticle = function buildArticle(articleEntry){
                        article_to_add = {
                            articleImage: `/images/images/${articleEntry.photoFilename}`,
                            articleTitle: articleEntry.headline,
                            articleBlurb: articleEntry.teaser,
                            articleLink: `/article/${articleEntry.articleid}`,
                            publishDate: articleEntry.publishDate
                        }
                        return article_to_add;
                    }
                    function processDate(unix_timestamp){
                        // put into milliseconds
                        var date = new Date(unix_timestamp * 1000);
                        return moment(date).format('dddd, MMMM Do, YYYY');
                    }
                    let articles = otherArticles.map(buildArticle);
                    let date = processDate(leadArticle.publishDate);
                    res.render('issue', {
                        title: 'Issue',
                        featuredPic: `/images/images/${leadArticle.photoFilename}`,
                        featuredTitle: leadArticle.headline,
                        featuredCategory: leadArticle.section,
                        featuredBlurb: leadArticle.teaser,
                        featuredLink: `/article/${leadArticle.articleid}`,
                        issueArticles: articles,
                        issueNum: leadArticle.issueid,
                        issueDate: date
                      });
                })
            })
        }
    })
}

// TO DO: write an event handler for the search form (in search.hbs)

// TO DO: replace with values gotten from database queries
let issueArticles = [
  {
    articleImage: "/images/list-test.png",
    articleTitle: "This is the title of the first search result!",
    articleBlurb: "Here is the blurb about this article. Wow I wonder what it's about, it must be so so so so cool",
    articleLink: "/article",
  },
  {
    articleImage: "/images/list-test.png",
    articleTitle: "This is the title of the second search result!",
    articleBlurb: "Here is the blurb about this article. Wow I wonder what it's about, it must be so so so so cool",
    articleLink: "/article",
  },
]


module.exports = {
    getIssue
};