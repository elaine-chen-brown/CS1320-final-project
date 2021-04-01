const sql = require("./db.js");

const Search = function(search) {
    this.keyword = search.keyword;
    this.authorName = search.authorname;
}


// search by keyword
Search.findByKeyword = (keyword, result) => {
  keyword = '%' + keyword + '%';
  sql.query("SELECT articleid, headline, teaser FROM articles WHERE headline LIKE ? OR body LIKE ?", [keyword, keyword], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res);
      return;
    }
    result({kind: "not_found"}, null);
  });
};

// search by author name
Search.findByAuthor = (authorName, result) => {
  authorName = '%' + authorName + '%';
  sql.query("SELECT authorid, author from authors WHERE author LIKE ?", authorName, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res);
      return;
    }
    result({kind: "not_found"}, null);
  });
};

module.exports = Search;