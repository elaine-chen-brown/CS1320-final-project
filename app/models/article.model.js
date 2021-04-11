const sql = require("./db.js");

// constructor - follows current db schema exactly - can prob remove some at some point
const Article = function(article) {
    this.articleid = article.articleid;
    this.keyword = article.keyword;
    this.accountid = article.accountid;
    this.issueid  = article.issueid;
    this.headline = article.headline;
    this.sectionid = article.sectionid;
    this.section = article.section;
    this.priority = article.priority;
    this.body = article.body;
    this.inputType = article.inputType;
    this.teaser = article.teaser;
    this.photoUploadId = article.photoUploadId;
    this.photoFilename = article.photoFilename;
    this.photoCaption = article.photoCaption;
    this.photoCredit = article.photoCredit;
    this.photoPosition = article.photoPosition;
    this.views = article.views;
    this.comments = article.comments;
    this.emailedCount = article.emailedCount;
    this.previewToken = article.previewToken;
    this.publishDate = article.publishDate;
  };

Article.findById = (articleId, result) => {
    sql.query("SELECT * FROM articles WHERE articleid = ?",articleId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        //console.log("found article: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Article with the id
      result({ kind: "not_found" }, null);
    });
  };

// use the article id to get both the author name and authorid
Article.getAuthorByArticleId = (articleId, result) => {
    sql.query( "SELECT authors.authorid, authors.author FROM authorassociations INNER JOIN authors ON authors.authorid=authorassociations.authorid WHERE authorassociations.articleid= ?", articleId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            //console.log("found article: ", res[0]);
            result(null, res);
            return;
        }

        // not found Article with the id
        result({ kind: "not_found" }, null);
    });
};

Article.findRelated = (articleId, section, result) => {
    sql.query( "SELECT * FROM articles WHERE section = ? AND articleid <> ? ORDER BY publishDate DESC LIMIT 6 ", [section, articleId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            //console.log("found article: ", res[0]);
            result(null, res);
            return;
        }

        // not found Article with the id
        result({ kind: "not_found" }, null);
    });
}

Article.updateViews = (articleId, result) => {
    // sql.query("UPDATE articles SET views = views + 1 WHERE articleid = ?", articleId, (err, res) => {
    //     if (err) {
    //         console.log("error: ", err);
    //     }
    //     if (res.affectedRows == 0) {
    //         result({ kind: "not_found" }, null);
    //     }
    //     console.log("updated customer: ");
    //     result(null, true);
    // })
    result(null, false); // remove this line when putting query back in 
}


module.exports = Article;