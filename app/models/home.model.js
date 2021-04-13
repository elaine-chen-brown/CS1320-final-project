const sql = require("./db.js");

//?
const Home = function(home) {
    this.mostviewed = home.mostviewed
}

// get the top x most viewed articles, taking only ones published after 2014
Home.findMostViewed = (numToGet, result) => {
    sql.query("SELECT * FROM articles WHERE FROM_UNIXTIME(publishDate, '%Y') > 2018 ORDER BY views DESC LIMIT ?", numToGet, (err, res) => {
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

// get the featured article from the most recent issue or the most recent topical article (whichever is newer)
// inner query gets the articleid of the most recent issue's featured article
// then combines with topical articles (issueid 0), orders by date and takes top
Home.findRecentFeatured = (result) => {
    sql.query("SELECT * from articles WHERE issueid=0 OR articleid IN (SELECT articleid FROM articles a INNER JOIN (SELECT leadStory FROM issues GROUP BY issueid ORDER BY issueid DESC LIMIT 1) b ON a.articleid = b.leadStory) ORDER BY publishDate DESC LIMIT 1", (err, res) => {
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

// get 50 recent articles that don't include the top featured article
Home.findRecentArticles = (featuredId, result) => {
    sql.query("SELECT * FROM articles WHERE articleid <> ? ORDER BY publishDate DESC, articleid limit 15", featuredId, (err, res) => {
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

Home.findNextArticleSet = (featuredId, offset, result) => {
    sql.query("SELECT * FROM articles WHERE articleid <> ? ORDER BY publishDate DESC, articleid limit ?, 10", [featuredId, offset], (err, res) => {
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

module.exports = Home;