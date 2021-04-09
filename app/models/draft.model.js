const sql = require("./db.js");
const fs = require('fs');

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
    var headline = articleInfo.headline;
    var body = articleInfo.content;
    var authorInfo = articleInfo.author.split(",");
    var authorid = authorInfo[0];
    var author = authorInfo[1];
    var teaser = articleInfo.teaser;
    var categoryInfo = articleInfo.category.split(",");
    var sectionid = categoryInfo[0];
    var section = categoryInfo[1];
    var type = articleInfo.type;
    var photoName = articleInfo.photoFile;
    var photoCaption = articleInfo.photoCaption;
    //don't forget to add back in photo information later
    sql.query("INSERT INTO drafts (headline, teaser, body, author, authorid, section, sectionid, type, photoFilename, photoCaption) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [headline, teaser, body, author, authorid, section, sectionid, type, photoName, photoCaption], (err, res) => {
        if (err) {
            console.log("error: ", err);
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
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res);
            return;
        }
        result({ kind: "no_drafts" }, null);
    })
}

Draft.publish = (articleid, issueid, date, result) => {
    console.log(articleid);
    sql.query("SELECT * FROM drafts WHERE articleid = ?", articleid, (err, res) => {
        if (err) {
            console.log(err);
        }
        if (res.length) {
            //insert into articles
                //need to generate previewToken, keyword, photoUploadId
            var previewToken; //generate
            var keyword;
            var headline;
            sql.query("SELECT headline FROM drafts WHERE articleid = ?", articleid, (err, res) => {
                if (err) {
                    console.log(err);
                }
                else {
                    headline = res.headline;
                    keyword = headline.authorInfosplit(/(?:,| )+/, 6).join("-");
                }
            });
            //generate photoUploadId and corresponding photoFilename
            var photoUploadId = 0;
            var newPhotoFilename = "";
            sql.query("SELECT MAX(photoUploadId) FROM articles", (err, res) => {
                if (err) {
                    console.log(err);
                }
                else {
                    photoUploadId = res.photoUploadId + 1;
                    newPhotoFilename = photoUploadId.toString() + ".jpg"; //any way for us to check the photo type of original image?
                }
            });
            //move photo
            //https://stackoverflow.com/questions/8579055/how-do-i-move-files-in-node-js
            sql.query("SELECT photoFilename FROM drafts WHERE articleid = ?", articleid, (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (res.length) {
                    var oldPath = '/public/images/drafts/' + res.photoFilename;
                    var newPath = '/public/images/images/' + newPhotoFilename;
                    fs.rename(oldPath, newPath, function(err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("Successfully renamed + moved");
                        }
                    })
                }
                //not found error handling
            })

            //insert general info into articles and delete
            //https://stackoverflow.com/questions/1612267/move-sql-data-from-one-table-to-another 
            // Don't actually need to insert articleid
            let queryBody = `BEGIN TRANSACTION;
            INSERT INTO articles (headline, sectionid, section, body, teaser, photoFilename, photoCaption)
            SELECT (headline, sectionid, section, body, teaser, photoFilename, photoCaption)
            FROM drafts WHERE articleid = ?;
            DELETE FROM drafts WHERE articleid = ?;
            COMMIT;`;
            sql.query(queryBody, [articleid, articleid], (err, res) => {
                if (err) {
                    console.log(err);
                }
                else {
                    sql.query("INSERT INTO articles (keyword, accountid, issueid, inputType, photoUploadId, publishDate) VALUES (?, ?, ?, ?, ?, ?) WHERE articleid = MAX(articleid)", [keyword, 3, issueid, 'html', photoUploadId, date], (err, data) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("Successfully moved");
                        }
                    })
                }
            })

            //insert info into authorassociations
            sql.query("SELECT authorid FROM drafts WHERE articleid = ?", articleid, (err, res) => {
                if (err) {
                    console.log(err);
                }
                if (res.length) {
                    sql.query("SELECT MAX(articleid) FROM articles"), (err, res2) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            sql.query("INSERT INTO authorassociations VALUES (?, ?)", [res2.articleid, res.authorid], (err, res) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    console.log("Successfully inserted into authorassociations");
                                }
                            })
                        }
                    }
                    
                }
            })
        }
    })
}

//so that it's only called once for an issue
Draft.newIssue = (issueid, date, leadid, result) => {
    var number = issueid - 42; //might need to change this
    sql.query("INSERT INTO issues VALUES (?, 3, ?, ?, ?)", [issueid, number, date, leadid], (err, res) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Successfully inserted new issue");
        }
    })
}

module.exports = Draft;