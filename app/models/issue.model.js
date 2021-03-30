const sql = require("./db.js");

const Issue = function(issue) {
    this.issueid = issue.issueid;
    this.publishDate = issue.publishDate;
    this.leadStory = issue.leadStory;
}

// get the featured article id from a given issue number
Issue.findFeaturedArticleId = (issueId, result) => {
    sql.query("SELECT leadStory FROM issues WHERE issueid = ?", issueId, (err, res) => {
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

// pass in the issue id and the id of the featured article, get the rest of the issue's articles
Issue.findNonFeaturedArticles = (featuredId, issueId, result) => {
    sql.query("SELECT * FROM articles WHERE articleid <> ? AND issueid = ?", [featuredId, issueId], (err, res) => {
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

module.exports = Issue;