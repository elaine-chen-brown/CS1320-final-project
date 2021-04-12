const sql = require("./db.js");

const Issue = function(issue) {
    this.issueid = issue.issueid;
    this.publishDate = issue.publishDate;
    this.leadStory = issue.leadStory;
}

// get the featured article id from a given issue number
Issue.findFeaturedArticleId = (issueId, result) => {
    sql.query("SELECT leadStory,number FROM issues WHERE issueid = ?", issueId, (err, res) => {
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
        result(null,res);
    });
};

Issue.getLatest = (result) => {
    sql.query("SELECT MAX(issueid) AS latestid FROM issues", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Issue.findTopicalForYear = (year, result) => {
    sql.query("SELECT * FROM articles WHERE issueid = 0 AND from_unixtime(publishDate, '%Y')=? ORDER BY publishDate", year, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        result(null,res);
    });
}

module.exports = Issue;