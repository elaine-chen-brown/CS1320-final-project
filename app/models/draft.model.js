const sql = require("./db.js");
const fs = require('fs');

const Draft = function(article) {
    this.articleid = article.articleid;
    this.headline = article.headline;
    this.section = article.section;
    this.body = article.body;
    this.teaser = new_article.teaser;
    this.photoUploadId = article.photoUploadId;
    this.photoFilename = article.photoFilename;
    this.photoCaption = article.photoCaption;
    /*this.photoCredit = article.photoCredit;
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

    var photoUploadId;
    var photoName = articleInfo.photoFile;
    var photoCaption = articleInfo.photoCaption;

    if (photoName) {
        var extension = photoName.split(".");
        extension = extension[extension.length - 1];
        
        sql.query("SELECT MAX(photoUploadId) AS photoId FROM drafts", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            else {
                if (!res) {
                    console.log("res from drafts");
                    const result = JSON.parse(JSON.stringify(res))[0];
                    photoUploadId = parseInt(result.photoId) + 1;
                    var newPhotoName = photoUploadId + "." + extension;
                    var oldPath = '../../public/images/drafts/' + photoName;
                    var newPath = '../../public/images/drafts/' + newPhotoName;
                    fs.rename(oldPath, newPath, function(err) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        else {
                            console.log("Successfully renamed photo");
                            photoName = newPhotoName;
                            sql.query("INSERT INTO drafts (headline, teaser, body, author, authorid, section, sectionid, type, photoUploadId, photoFilename, photoCaption) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [headline, teaser, body, author, authorid, section, sectionid, type, photoUploadId, photoName, photoCaption], (err, res) => {
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
                    })
                }
                else {
                    sql.query("SELECT MAX(photoUploadId) AS photoId FROM articles", (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                            return;
                        }
                        else {
                            console.log("res from articles");
                            const result = JSON.parse(JSON.stringify(res))[0];
                            photoUploadId = parseInt(result.photoId) + 1;
                            var newPhotoName = photoUploadId + "." + extension;
                            var oldPath = __dirname + '/../../public/images/drafts/' + photoName;
                            var newPath = __dirname + '/../../public/images/drafts/' + newPhotoName;
                            fs.rename(oldPath, newPath, function(err) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                else {
                                    console.log("Successfully renamed photo");
                                    photoName = newPhotoName;
                                    sql.query("INSERT INTO drafts (headline, teaser, body, author, authorid, section, sectionid, type, photoUploadId, photoFilename, photoCaption) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [headline, teaser, body, author, authorid, section, sectionid, type, photoUploadId, photoName, photoCaption], (err, res) => {
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
                            })
                        }
                    })
                }

            }
        })    
    }
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
            return;
        }
        if (res.length) {
            //insert general info into articles and delete
            //https://stackoverflow.com/questions/1612267/move-sql-data-from-one-table-to-another 
            // Don't actually need to insert articleid
            let queryBody = `BEGIN TRANSACTION;
            INSERT INTO articles (headline, sectionid, section, body, teaser, photoUploadId, photoFilename, photoCaption)
            SELECT (headline, sectionid, section, body, teaser, photoUploadId, photoFilename, photoCaption)
            FROM drafts WHERE articleid = ?;
            DELETE FROM drafts WHERE articleid = ?;
            COMMIT;`;
            sql.query(queryBody, [articleid, articleid], (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    sql.query("INSERT INTO articles (accountid, issueid, inputType, publishDate) VALUES (?, ?, ?, ?) WHERE articleid = MAX(articleid)", [3, issueid, 'html', date], (err, data) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        else {
                            console.log("Successfully inserted");

                            //insert info into authorassociations
                            sql.query("SELECT authorid FROM drafts WHERE articleid = ?", articleid, (err, res) => {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                if (res.length) {
                                    sql.query("SELECT MAX(articleid) FROM articles"), (err, res2) => {
                                        if (err) {
                                            console.log(err);
                                            return;
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




/*
            Old photo stuff keeping for reference

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
                    var newPath = '/public/images/images/' + res.photoFilename;
                    fs.rename(oldPath, newPath, function(err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("Successfully moved");
                        }
                    })
                }
                //not found error handling
            })
            */
