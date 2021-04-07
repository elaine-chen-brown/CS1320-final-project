const sql = require("./db.js");

const New = function(new_article) {
    this.articleid = new_article.articleid;
    this.headline = new_article.headline;
    //this.section = new_article.section;
    this.body = new_article.body;
    this.teaser = new_article.teaser;
    /*this.photoUploadId = new_article.photoUploadId;
    this.photoFilename = new_article.photoFilename;
    this.photoCaption = new_article.photoCaption;
    this.photoCredit = new_article.photoCredit;
    this.photoPosition = new_article.photoPosition;
    */
};

New.save = (articleInfo, result) => {
    console.log(articleInfo);
    var headline = articleInfo.title;
    var body = articleInfo.content;
    var author = articleInfo.author;
    var teaser = articleInfo.teaser;
    //don't forget to add back in photo information, category
    sql.query("INSERT INTO drafts (headline, teaser, body, author) VALUES (?, ?, ?, ?)", [headline, teaser, body, author], (err, res) => {
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

module.exports = New;