const sql = require("./db.js");

const Search = function(search) {
    this.keyword = search.keyword;
    this.authorName = search.authorname;
}


// search by keyword
Search.findByKeyword = (keyword, offset, result) => {
  sql.query("SELECT articleid, headline, teaser, photoFilename FROM articles WHERE MATCH(headline, body) against (?) LIMIT ?,15", [keyword, offset], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    }
    //return empty rather than erroring
    result(null, res);
  });
};

// search by author name
Search.findByAuthor = (authorName, result) => {
  authorName = '%' + authorName + '%';
  sql.query("SELECT authorid, author, title, isRetired from authors WHERE author LIKE ?", authorName, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    // if (res.length) {
    //   result(null, res);
    //   return;
    // }
    // result({kind: "not_found"}, null);
    // return empty rather than error
    result(null, res);
  });
};

module.exports = Search;