const sql = require("./db.js");

const Category = function(category) {
    this.categoryid = category.categoryid;
    this.name = category.name;
    this.featuredArticleId = category.featuredArticleId;
}

// get entry from sections for given category id
Category.findById = (categoryId, result) => {
    sql.query("SELECT * FROM sections WHERE sectionid = ?", categoryId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };

  // get all the article ids associated with a given sectionid
Category.findArticleIds = (categoryId, result) => {
    sql.query("SELECT articleid FROM articles WHERE sectionid = ? ORDER BY publishDate DESC", categoryId, (err, res) => {
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

  module.exports = Category;