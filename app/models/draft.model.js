const sql = require("./db.js");

const Draft = function(article) {
    this.articleid = article.articleid;
    this.headline = article.headline;
    this.section = article.section;
    this.body = article.body;
    this.teaser = new_article.teaser;
    /*this.photoUploadId = article.photoUploadId;
    this.photoFilename = article.photoFilename;
    this.photoCaption = article.photoCaption;
    this.photoCredit = article.photoCredit;
    this.photoPosition = article.photoPosition;
    */
};

Draft.save = (articleInfo, result) => {
    console.log(articleInfo);
    var headline = articleInfo.title;
    var body = articleInfo.content;
    var authorInfo = articleInfo.author;
    var authorid = authorInfo[0];
    var author = authorInfo[1];
    var teaser = articleInfo.teaser;
    var categoryInfo = articleInfo.category.split(",");
    var sectionid = categoryInfo[0];
    var section = categoryInfo[1];
    //don't forget to add back in photo information later
    sql.query("INSERT INTO drafts (headline, teaser, body, author, authorid, section, sectionid) VALUES (?, ?, ?, ?, ?, ?, ?)", [headline, teaser, body, author, authorid, section, sectionid], (err, res) => {
        if (err) {
            console.log("error inserting into table");
            result(err, null);
            return;
        }
        else {
            console.log(res);
            result(null, res);
            return;
        }
    });
}

Draft.getAll = (result) => {
    sql.query("SELECT * FROM drafts", (err, res) => {
        if (err) {
            console.log("error retrieving drafts");
            result(err, null);
            return;
        }
        else {
            console.log(res);
            result(null, res);
            return;
        }
    })
}

Draft.publish = (article, result) => {
    console.log(article);
    //Insert info into main database, delete from drafts 
}

module.exports = Draft;