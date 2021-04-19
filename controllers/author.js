// Controller handler to handle functionality in an author page
const Author = require("../app/models/author.model.js");
const Article = require("../app/models/article.model.js");

const { response } = require("express");

// handle a get request at '/author/:authorName' 
function findAuthor(req, res) {
    Author.findById(req.params.authorId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Author with id ${req.params.authorId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Author with id " + req.params.authorId
          });
        }
      }
      else {
        console.log("found author");
        data = data[0];
        //res.send(data);
        // fill in data for loading author 
        // TODO fix image and socials
        let first_name = (data.author).split(" ")[0];
        let title = data.title.toLowerCase();
        let authorName = data.author; 
        let authorPicture = (data.authorImage) ? "/images/authors/" + data.authorImage : "/images/author-default.png";
        let authorBlurb = (data.authorBio) ? data.authorBio : `${first_name} is an ${title} at The Noser.`;
        let instaLinkname = (data.authorInsta) ? data.authorInsta.replace("@", "") : "";
        let twitterLinkname = (data.authorTwitter) ? data.authorTwitter.replace("@", "") : "";
        let instaHandle = (data.authorInsta) ? data.authorInsta : ""; 
        let instaLink = (data.authorInsta) ? `/instagram.com/${instaLinkname}` : "#";
        let twitterHandle = (data.authorTwitter) ? data.authorTwitter : "";
        let twitterLink = (data.authorTwitter) ? `/twitter.com/${twitterLinkname}` : "#";
        
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
                        let hasPhoto = (data.photoFilename) ? true : false;
                        article_to_add = {
                            articleImage: `/images/images/${data.photoFilename}`,
                            articleTitle: data.headline,
                            articleBlurb: data.teaser,
                            articleLink: `/article/${entry.articleid}`,
                            publishDate: data.publishDate,
                            hasPhoto: hasPhoto,
                        }
                        resolve(article_to_add);
                    }
                })
            })
        }

        var getArticles = function getArticles(authorId) {
            return new Promise((resolve,reject) => {
                Author.findArticles(authorId, (err,data) => {
                    if (err) {
                        if (err.kind === "not_found") {
                            reject(`Not found articles for author with id ${authorId}.`);
                        } else {
                            reject("Error finding article for author with id " + authorId);
                        }
                    }
                    else {
                        resolve(data);
                    }
                })
            })
        }
        getArticles(req.params.authorId).then(articleIds => {
            //get all the articles from database
            var actions = articleIds.map(findArticle);
            var results = Promise.all(actions);
            results.then(articles => {
                articles.sort(function(a, b){
                    // sort articles so they display with the newest dates at the top
                    return b.publishDate - a.publishDate;
                });
                // displayfunc(data);
                res.render('author', {
                    title: 'Author',
                    authorName: authorName,
                    authorPicture: authorPicture,
                    authorBlurb: authorBlurb,
                    instaHandle: instaHandle,
                    instaLink: instaLink,
                    twitterHandle: twitterHandle,
                    twitterLink: twitterLink,
                    authorArticles: articles
                });
            })
        }).catch(error => {
            console.log(instaLink);
            res.render('author', {
                title: 'Author',
                authorName: authorName,
                authorPicture: authorPicture,
                authorBlurb: authorBlurb,
                instaHandle: instaHandle,
                instaLink: instaLink,
                twitterHandle: twitterHandle,
                twitterLink: twitterLink,
                authorArticles: []
            });
        })
        
        // let authorArticles = getAuthorArticleIds(req,res, (articles) => {
        //     res.render('author', {
        //       title: 'Author',
        //       authorName: authorName,
        //       authorPicture: authorPicture,
        //       authorBlurb: authorBlurb,
        //       instaHandle: instaHandle,
        //       instaLink: instaLink,
        //       twitterHandle: twitterHandle,
        //       twitterLink: twitterLink,
        //       authorArticles: articles
        //     });  
        //   });
      }
    });
  };



// function getAuthorArticleIds(req, res, displayfunc ) {
//     Author.findArticles(req.params.authorId, (err, data) => {
//         if (err) {
//           if (err.kind === "not_found") {
//             res.status(404).send({
//               message: `Not found articles for Author with id ${req.params.authorId}.`
//             });
//           } else {
//             res.status(500).send({
//               message: "Error retrieving articles for Author with id " + req.params.authorId
//             });
//           }
//         }
//         else {
//             var findArticle = function getArticleById(entry) {
//                 return new Promise((resolve, reject) => {
//                     Article.findById(entry.articleid, (err, data) => {
//                         if (err) {
//                             if (err.kind === "not_found") {
//                                 reject(`Not found Article with id ${entry.articleid}.`);
//                             } else {
//                                 reject("Error retrieving Article with id " + entry.articleid);
//                             }
//                         }
//                         else {
//                             // TODO add images
//                             let hasPhoto = (data.photoFilename) ? true : false;
//                             article_to_add = {
//                                 articleImage: `/images/images/${data.photoFilename}`,
//                                 articleTitle: data.headline,
//                                 articleBlurb: data.teaser,
//                                 articleLink: `/article/${entry.articleid}`,
//                                 publishDate: data.publishDate,
//                                 hasPhoto: hasPhoto,
//                             }
//                             resolve(article_to_add);
//                         }
//                     })
//                 })
//             }
//             //get all the articles from database
//             var actions = data.map(findArticle);
//             var results = Promise.all(actions);
//             results.then(data => {
//                 data.sort(function(a, b){
//                     // sort articles so they display with the newest dates at the top
//                     return b.publishDate - a.publishDate;
//                 });
//                 displayfunc(data);
//             })
//         }
//     })
// }


module.exports = {
    findAuthor
};