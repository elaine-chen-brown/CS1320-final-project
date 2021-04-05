const sql = require("./db.js");

const New = function(new_article) {
    this.articleid = new_article.articleid;
    this.headline = article.headline;
    this.section = article.section;
    this.body = article.body;
    this.inputType = 'html';
    this.teaser = article.teaser;
    this.photoUploadId = article.photoUploadId;
    this.photoFilename = article.photoFilename;
    this.photoCaption = article.photoCaption;
    this.photoCredit = article.photoCredit;
    this.photoPosition = article.photoPosition;
};

New.save = (articleInfo) => {
    console.log(articleInfo);
    //don't forget to add back in photo information
    /* sql.query("INSERT INTO articles (headline, section, body, inputType, teaser, published) VALUES (...)", (err, res) => {
        if (err) {
            console.log("error inserting into table");
            return;
        }
    });
    */
}

module.exports = New;