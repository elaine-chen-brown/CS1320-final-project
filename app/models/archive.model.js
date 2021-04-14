const sql = require("./db.js");

//?
const Archive = function(archive) {
    this.years = archive.years;
}

// get all the years that have articles in the database
Archive.findYears = (result) => {
    sql.query("SELECT DISTINCT FROM_UNIXTIME(publishDate, '%Y') AS year FROM articles WHERE publishDate IS NOT NULL ORDER BY year DESC", (err, res) => {
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

// get the issueids, dates, and preview links from all the issues from one year
Archive.findYearIssues = (year, result) => {
    sql.query("SELECT DISTINCT a.issueid, a.publishDate, b.issuuLink FROM articles a INNER JOIN issues b ON a.issueid = b.issueid WHERE from_unixtime(a.publishDate, '%Y')=? ORDER BY a.publishDate", year, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log(res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

module.exports = Archive;