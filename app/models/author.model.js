const sql = require("./db.js");

// constructor - follows current db schema
const Author = function(author) {
  this.author_id = author.author_id;
  this.account_id = author.account_id;
  this.keyword = author.keyword;
  this.author = author.author;
  this.title = author.title;
  this.isRetired = author.isRetired;
  this.articleCount = author.articleCount;
};

Author.create = (newAuthor, result) => {
  sql.query("INSERT INTO authors SET ?", newAuthor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created author: ", { id: res.insertId, ...newAuthor });
    result(null, { id: res.insertId, ...newAuthor });
  });
};

Author.getAllActive = (result) => {
  sql.query("SELECT author, authorid FROM authors WHERE isRetired = 0 ORDER BY author ASC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null);
  })
}

Author.findById = (authorId, result) => {
  sql.query("SELECT * FROM authors WHERE authorid = ?", authorId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found author: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Author with the id
    result({ kind: "not_found" }, null);
  });
};

Author.findArticles = (authorId, result) => {
    sql.query("SELECT * FROM authorassociations WHERE authorid = ?",authorId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found author articles: ", res);
        result(null, res);
        return;
      }
  
      result({ kind: "not_found" }, null);
    });
  };


module.exports = Author;