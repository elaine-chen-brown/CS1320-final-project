const sql = require("./db.js");
const fs = require('fs');

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

Author.editAuthor = (info, result) => {
  var authorid = info.id;
  var authorname = info.name;
  var retired = info.retired;
  var insta = info.insta;
  var twitter = info.twitter;
  var bio = info.bio;
  var photoName = info.authorPhoto;
  sql.query("UPDATE authors SET author = ?, isRetired = ?, authorInsta = ?, authorTwitter = ?, authorBio = ? WHERE authorid = ?", [authorname, retired, insta, twitter, bio, authorid], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {
      if (photoName) {
        var extension = photoName.split(".");
        extension = extension[extension.length - 1];
        var newPhotoName = authorid + "." + extension;
        var oldPath = __dirname + '/../../public/images/authors/' + photoName;
        var newPath = __dirname + '/../../public/images/authors/' + newPhotoName;
        fs.rename(oldPath, newPath, function(err) {
          if (err) {
            console.log(err);
            result(err, null);
            return;
          }
          else {
            console.log("Successfully renamed photo to ", newPhotoName);
            sql.query("UPDATE authors SET authorImage = ? WHERE authorid = ?", [newPhotoName, authorid], (err, res) => {
              if (err) {
                console.log(err);
                result(err, null);
                return;
              }
              else {
                result(null, res);
                return;
              }
            })
          }
        })
      }
      else {
        result(null, res);
        return;
      }
    }
  })
}

Author.newAuthor = (info, result) => {
  var authorname = info.name;
  var role = info.role;
  var insta = info.insta;
  var twitter = info.twitter;
  var bio = info.bio;
  var photoName = info.authorPhoto;
  
  sql.query("INSERT INTO authors (author, title, authorInsta, authorTwitter, authorBio) VALUES (?, ?, ?, ?, ?)", [authorname, role, insta, twitter, bio], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    else {
      var authorid = res.insertId;
      if (photoName) {
        var extension = photoName.split(".").pop();
        //extension = extension[extension.length - 1];
        var newPhotoName = authorid + "." + extension;
        var oldPath = __dirname + '/../../public/images/authors/' + photoName;
        var newPath = __dirname + '/../../public/images/authors/' + newPhotoName;
        fs.rename(oldPath, newPath, function(err) {
          if (err) {
            console.log(err);
            result(err, null);
            return;
          }
          else {
            sql.query("UPDATE authors SET authorImage = ? WHERE authorid = ?", [newPhotoName, authorid], (err, res) => {
              if (err){
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
        })
      }
      else {
        result(null, res);
        return;
      }
    }

  })
}

module.exports = Author;