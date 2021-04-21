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
            result(null, res);
            return;
        }

        // not found Article with the id
        result({ kind: "not_found" }, null);
    });
}

Article.updateViews = (articleId, result) => {
    sql.query("UPDATE articles SET views = views + 1 WHERE articleid = ?", articleId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, true);
    })
}

Article.getAll = (result) => {
  sql.query("SELECT * FROM articles", (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    }
    else {
      result(null, res);
    }
  })
}

Article.deletePublished = (articleId, result) => {
  sql.query("SELECT * FROM issues WHERE leadStory = ?", articleId, (err, res) => {
    if (err) {
      console.log(err);
      result(err, null);
    }
    else {
      if (res.length) {
        result({ kind: "cannot_delete_featured"}, null);
      }
      else {
        sql.query("DELETE FROM articles WHERE articleid = ?", articleId, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
          }
          else {
            sql.query("DELETE FROM authorassociations WHERE articleid = ?", articleId, (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(err, null);
              }
              else {
                result(null, "success");
              }
            })
          }
        })
      }
    }
  })
  
}

module.exports = Article;