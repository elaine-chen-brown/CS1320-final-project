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
        console.log("found author: ", res);
        result(null, res);
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


Author.getAll = (result) => {
  sql.query("SELECT author, authorid FROM authors ORDER BY author ASC", (err, res) => {
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

Author.editAuthor = (info, authorid, result) => {
  var authorname = info[0];
  var retired = info[1];
  var insta = info[2];
  var twitter = info[3];
  var bio = info[4];
  //var title = info[5];
  //var picture = info[6];
  sql.query("UPDATE authors SET author = ?, isRetired = ?, authorInsta = ?, authorTwitter = ?, authorBio = ? WHERE authorid = ?", [authorname, retired, insta, twitter, bio, authorid], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {
      result(null, res);
      return;
    }
  })
}

module.exports = Author;