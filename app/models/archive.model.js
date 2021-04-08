const sql = require("./db.js");

//?
const Archive = function(archive) {
    this.years = archive.years;
}

// get all the years that have articles in the database
Archive.findYears = (result) => {
    sql.query("SELECT DISTINCT FROM_UNIXTIME(publishDate, '%Y') AS year FROM articles WHERE publishDate IS NOT NULL ORDER BY year", (err, res) => {
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

Archive.findYearIssues = (year, result) => {
    sql.query("SELECT DISTINCT issueid, publishDate FROM articles WHERE from_unixtime(publishDate, '%Y')=? ORDER BY publishDate", year, (err, res) => {
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