const sql = require("./db.js");

// constructor - follows current db schema
const About = function(about) {
  this.aboutBlurb = about.aboutBlurb;

};

About.getBlurb = (accountId, result) => {
    sql.query("SELECT metaDescription FROM accounts WHERE accountid = ?", accountId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found account blurb: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    });
};

About.getActiveStaff = (offset, result) => {
    sql.query("SELECT * FROM authors WHERE isRetired = 0 ORDER BY title, author, authorid LIMIT ?,16", offset, (err, res) => {
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

module.exports = About;