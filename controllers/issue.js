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
            let realIssueNumber = data.number;
            let issuuLink = data.issuuLink;
            let hasIssuu = (data.issuuLink) ? true : false;
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
                        let hasPhoto = (articleEntry.photoFilename) ? true : false;
                        article_to_add = {
                            articleImage: `/images/images/${articleEntry.photoFilename}`,
                            articleTitle: articleEntry.headline,
                            articleBlurb: articleEntry.teaser,
                            articleLink: `/article/${articleEntry.articleid}`,
                            publishDate: articleEntry.publishDate,
                            hasPhoto: hasPhoto
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
                    let year = (date.split(',')[2]).trim();
                    let hasFeaturedPhoto = (leadArticle.photoFilename) ? true : false;
                    res.render('issue', {
                        title: 'Issue',
                        featuredPic: `/images/images/${leadArticle.photoFilename}`,
                        hasFeaturedPhoto: hasFeaturedPhoto,
                        featuredTitle: leadArticle.headline,
                        featuredCategory: leadArticle.section,
                        featuredBlurb: leadArticle.teaser,
                        featuredLink: `/article/${leadArticle.articleid}`,
                        issueArticles: articles,
                        issueNum: realIssueNumber,
                        issueDate: date,
                        isNonTopical: true,
                        lastArchiveLink: `/archive/${year}`,
                        hasIssuu: hasIssuu,
                        issuuLink: issuuLink
                      });
                })
            })
        }
    })
}

function getTopicalYear(req, res){
    Issue.findTopicalForYear(req.params.year, (err,data) => {
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
            let topicalArticles = data.map(buildArticle);
            res.render('issue', {
                title: 'Issue',
                issueArticles: topicalArticles,
                issueNum: 0,
                issueDate: 0,
                isNonTopical: false,
                year: req.params.year,
                lastArchiveLink: `/archive/${req.params.year}`
              });
        }
    })
}





module.exports = {
    getIssue,
    getTopicalYear
};