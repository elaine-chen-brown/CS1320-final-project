const sql = require("./db.js");

//?
const Home = function(home) {
    this.mostviewed = home.mostviewed
}

// get the top x most viewed articles, taking only ones published after 2014
Home.findMostViewed = (numToGet, result) => {
    sql.query("SELECT * FROM articles WHERE FROM_UNIXTIME(publishDate, '%Y') > 2014 ORDER BY views DESC LIMIT ?", numToGet, (err, res) => {
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