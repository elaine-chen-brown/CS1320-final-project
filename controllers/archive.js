// Controller handler to handle functionality in archive page
const Archive = require("../app/models/archive.model.js");

const { response } = require("express");
var moment = require('moment'); 

// handle a get request at '/archive' endpoint.
function getArchive(request, response){
    var findTimeLineYears = function getTimelineYears(entry) {
        return new Promise((resolve, reject) => {
            Archive.findYears((err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        reject(`Not found archive years.`);
                    } else {
                        reject("Error retrieving archive years");
                    }
                }
                else {
                    resolve(data);
                }
            })
        })
    }
    var findYearIssues = function getYearIssues(year) {
        return new Promise((resolve, reject) => {
            Archive.findYearIssues(year, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        reject(`Not found archive issues for year ${year}.`);
                    } else {
                        reject("Error retrieving issues for archive year " + year);
                    }
                }
                else {
                    resolve(data);
                }
            })
        })
    }
    findTimeLineYears().then(yearsList => {
        findYearIssues(request.params.year).then(issues => {
            function processDate(unix_timestamp){
                // put into milliseconds
                var date = new Date(unix_timestamp * 1000);
                return moment(date).format('Do MMMM YYYY');
            }
            // issues has issue id and publishDate as unixtime
            function getIssueLabel(issue) {
                let date = processDate(issue.publishDate);
                return {
                    issueDate: date,
                    issueLink: `/issue/${issue.issueid}`,
                    issueNum: issue.issueid
                }
            }
            let issuesWithPreviewLinks = issues.filter(issue => (issue.issuuLink) ? true : false);
            // put all topical articles in one section at the end
            let archiveList = issues.map(getIssueLabel);
            let archiveTopicalFiltered = archiveList.filter(issue => issue.issueNum != 0);
            // if topical articles were filtered, add topical article entry
            if (archiveTopicalFiltered.length < archiveList.length){
                archiveTopicalFiltered.push({issueDate:"Topical Articles", issueLink: `/topical/${request.params.year}`, issueNum: 0})
                archiveList = archiveTopicalFiltered;
            }
            if (issuesWithPreviewLinks.length >= 1) {
                firstIssuu = (issuesWithPreviewLinks[0]).issuuLink;
                issuesWithPreviewLinks = issuesWithPreviewLinks.slice(1,);
                hasIssuu = true;
            } else {
                firstIssuu = "";
                issuesWithPreviewLinks = [];
                hasIssuu = false;
            }
            response.render('archive', {
                title: 'Archive',
                timelineYears: yearsList,
                archiveList1: archiveList,
                archiveList2: [],
                year: request.params.year,
                issuesWithLinks: issuesWithPreviewLinks,
                firstIssuu: firstIssuu,
                hasIssuu: hasIssuu
            });
        }).catch(error => {
            if (error.kind === "not_found") {
                response.status(404).send({
                    message: `Not found Archive year ${request.params.year}.`
                });
            } else {
                response.status(500).send({
                    message: "Error retrieving archive year " + request.params.year
                });
            }
        })
        
    })
}

function getRecentYear(request, response){
    var findTimeLineYears = function getTimelineYears(entry) {
        return new Promise((resolve, reject) => {
            Archive.findYears((err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        reject(`Not found archive years.`);
                    } else {
                        reject("Error retrieving archive years");
                    }
                }
                else {
                    resolve(data);
                }
            })
        })
    }
    findTimeLineYears().then(years => {
        let recentYear = years[0].year;
        response.redirect(`/archive/${recentYear}`);
    })
}


module.exports = {
    getArchive,
    getRecentYear
};