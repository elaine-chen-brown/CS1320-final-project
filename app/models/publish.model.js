const sql = require("./db.js");

const Publish = function(article) {
    this.headline = article.headline;
    this.section = article.section;
    this.body = article.body;
    this.inputType = 'html';
    this.teaser = article.teaser;
    /*this.photoUploadId = article.photoUploadId;
    this.photoFilename = article.photoFilename;
    this.photoCaption = article.photoCaption;
    this.photoCredit = article.photoCredit;
    this.photoPosition = article.photoPosition;*/
};

Publish.publish = (articles, result) => {
    console.log(articles);
    //Insert info into main database, delete from drafts 
    
}

module.exports = Publish;