const sql = require("./db.js");
const fs = require('fs');
const { Console } = require("console");
const { resolve6 } = require("dns");

const Draft = function(article) {
    this.articleid = article.articleid;
    this.headline = article.headline;
    this.section = article.section;
    this.body = article.body;
    this.teaser = new_article.teaser;
    this.photoUploadId = article.photoUploadId;
    this.photoFilename = article.photoFilename;
    this.photoCaption = article.photoCaption;
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

    var photoUploadId = 0;
    var photoName = articleInfo.photoFile;
    var photoCaption = articleInfo.photoCaption;

    if (photoName) {
        var extension = photoName.split(".").pop();
        
        sql.query("SELECT MAX(photoUploadId) AS photoId FROM drafts", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            else {
                let parsedRes = JSON.parse(JSON.stringify(res))[0];
                if (parseInt(parsedRes.photoId) == 0) {
                    photoUploadId = parseInt(parsedRes.photoId) + 1;
                    var newPhotoName = photoUploadId + "." + extension;
                    var oldPath = __dirname + '/../../public/images/drafts/' + photoName;
                    var newPath = __dirname + '/../../public/images/drafts/' + newPhotoName;
                    fs.rename(oldPath, newPath, function(err) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        else {
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
                            let photoRes = JSON.parse(JSON.stringify(res))[0];
                            photoUploadId = parseInt(photoRes.photoId) + 1;
                            var newPhotoName = photoUploadId + "." + extension;
                            var oldPath = __dirname + '/../../public/images/drafts/' + photoName;
                            var newPath = __dirname + '/../../public/images/drafts/' + newPhotoName;
                            fs.rename(oldPath, newPath, function(err) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                else {
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
    else {
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

Draft.getAllTopical = (result) => {
    sql.query("SELECT * FROM drafts WHERE type = 'topical'", (err, res) => {
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

Draft.getIssue = (result) => {
    sql.query("SELECT * FROM drafts WHERE type = 'issue'", (err, res) => {
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

Draft.findById = (articleid, result) => {
    sql.query("SELECT * FROM drafts WHERE articleid = ?", articleid, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res);
            return;
        }
        result({kind: "not_found"}, null);
    })
}

Draft.publish = (articleid, issueid, date, result) => {
    sql.query("SELECT * FROM drafts WHERE articleid = ?", articleid, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        if (res.length) {
            let queryBody = "INSERT INTO articles (headline, sectionid, section, body, teaser, photoUploadId, photoFilename, photoCaption) SELECT headline, sectionid, section, body, teaser, photoUploadId, photoFilename, photoCaption FROM drafts WHERE articleid = ?"
            sql.query(queryBody, [articleid, articleid], (err, res) => {
                if (err) {
                    console.log(err);
                    result(err, null);
                    return;
                }
                else {
                    var newid = res.insertId;

                    sql.query("SELECT photoFilename AS photoName FROM drafts WHERE articleid = ?", articleid, (err, res) => {
                        if (err) {
                            console.log(err);
                            result(err, null);
                            return;
                        }
                        if (res.length) {
                            let photoFilename = JSON.parse(JSON.stringify(res))[0].photoName;
                            var oldPath = __dirname + '/../../public/images/drafts/' + photoFilename;
                            var newPath = __dirname + '/../../public/images/images/' + photoFilename;
                            fs.rename(oldPath, newPath, function(err) {
                                if (err) {
                                    console.log(err);
                                }
                            })
                        }
                    })
                    sql.query("UPDATE articles set issueid = ?, inputType = ?, publishDate = ? WHERE articleid = ?", [issueid, 'html', date, newid], (err, data) => {
                        if (err) {
                            console.log(err);
                            result(err, null);
                            return;
                        }
                        else {
                            //console.log("Successfully updated");
                            sql.query("SELECT authorid FROM DRAFTS WHERE articleid = ?", articleid, (err, res3) => {
                                if (err) {
                                    console.log(err);
                                    result(err, null);
                                    return;
                                }
                                else {
                                    authorid = JSON.parse(JSON.stringify(res3))[0].authorid;
                                    sql.query("INSERT INTO authorassociations VALUES(?, ?)", [newid, authorid], (err, res) => {
                                        if (err) {
                                            console.log(err);
                                            result(err, null);
                                            return;
                                        }
                                        else {
                                            //console.log("Successfully inserted into authorassociations");
                                            result(null, newid);
                                            sql.query("DELETE FROM drafts WHERE articleid = ?", articleid, (err, res) => {
                                                if (err) {
                                                    console.log(err);
                                                    result(err, null);
                                                    return;
                                                }
                                                else {
                                                    console.log("Successfully deleted from drafts");
                                                    result(null, 'success');
                                                }
                                            })
                                        }
                                    })
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
Draft.newIssue = (issueid, leadid, date, result) => {
    var number = issueid - 42; //might need to change this
    console.log(leadid);
    sql.query("INSERT INTO issues (issueid, accountid, number, publishDate, leadStory) VALUES (?, ?, ?, ?, ?)", [issueid, 3, number, date, leadid], (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        else {
            console.log("Successfully inserted new issue");
            result(null, res);
        }
    })
}

Draft.editDraft = (info, result) => {
    var articleid = info.id;
    var headline = info.headline;
    var teaser = info.teaser;
    var type = info.type;
    var body = info.content;

    var photoUploadId = 0;
    var photoName = info.photoFile;
    var photoCaption = info.photoCaption;

    if (photoName) {
        var extension = photoName.split(".").pop();
        
        sql.query("SELECT MAX(photoUploadId) AS photoId FROM drafts", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            else {
                let parsedRes = JSON.parse(JSON.stringify(res))[0];
                if (parseInt(parsedRes.photoId) == 0) {
                    console.log("res from drafts");
                    photoUploadId = parseInt(parsedRes.photoId) + 1;
                    var newPhotoName = photoUploadId + "." + extension;
                    var oldPath = __dirname + '/../../public/images/drafts/' + photoName;
                    var newPath = __dirname + '/../../public/images/drafts/' + newPhotoName;
                    fs.rename(oldPath, newPath, function(err) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        else {
                            console.log("Successfully renamed photo to ", newPhotoName);
                            photoName = newPhotoName;
                            sql.query("UPDATE drafts SET headline = ?, teaser = ?, body = ?, type = ?, photoUploadId = ?, photoFilename = ?, photoCaption = ? WHERE articleid = ?", [headline, teaser, body, type, photoUploadId, photoName, photoCaption, articleid], (err, res) => {
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
                            let photoRes = JSON.parse(JSON.stringify(res))[0];
                            photoUploadId = parseInt(photoRes.photoId) + 1;
                            var newPhotoName = photoUploadId + "." + extension;
                            var oldPath = __dirname + '/../../public/images/drafts/' + photoName;
                            var newPath = __dirname + '/../../public/images/drafts/' + newPhotoName;
                            console.log("oldpath: ", oldPath);
                            console.log("newpath: ", newPath);
                            fs.rename(oldPath, newPath, function(err) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                else {
                                    console.log("Successfully renamed photo to ", newPhotoName);
                                    photoName = newPhotoName;
                                    sql.query("UPDATE drafts SET headline = ?, teaser = ?, body = ?, type = ?, photoUploadId = ?, photoFilename = ?, photoCaption = ? WHERE articleid = ?", [headline, teaser, body, type, photoUploadId, photoName, photoCaption, articleid], (err, res) => {
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
    else {
        sql.query("UPDATE drafts SET headline = ?, teaser = ?, body = ?, type = ? WHERE articleid = ?", [headline, teaser, body, type, articleid], (err, res) => {
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

}

Draft.deleteDraft = (articleid, result) => {
    sql.query("DELETE FROM drafts WHERE articleid = ?", articleid, (err, res) => {
        if (err) {
            console.log(err);
            result(err, null);
            return;
        }
        else {
            result(null, res);
        }
    })
}

module.exports = Draft;