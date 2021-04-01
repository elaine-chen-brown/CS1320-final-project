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
                    issueLink: `/issue/${issue.issueid}`
                }
            }
            let archiveList = issues.map(getIssueLabel);
            // TODO: not sure what the best way to handle columns is
            let archiveList1 = [];
            let archiveList2 = [];
            if (archiveList.length > 4){
                archiveList1 = archiveList.slice(0,4);
                archiveList2 = archiveList.slice(4,);
            }
            else {
                archiveList1 = archiveList;
            }
            // let archiveList1 = archiveList;
            response.render('archive', {
                title: 'Archive',
                timelineYears: yearsList,
                archiveList1: archiveList1,
                archiveList2: archiveList2,
            });
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
        console.log(years);
        console.log(years.length)
        let recentYear = years[years.length - 1].year;
        response.redirect(`/archive/${recentYear}`);
    })
}

// TO DO: replace with values gotten from database queries
// let timelineYears = [
//   {
//     year: 2006
//   },
//   {
//     year: 2007
//   },
//   {
//     year: 2008
//   },
//   {
//     year: 2009
//   },
//   {
//     year: 2010
//   },
//   {
//     year: 2011
//   },
//   {
//     year: 2012
//   },
//   {
//     year: 2013
//   },
//   {
//     year: 2014
//   },
//   {
//     year: 2015
//   },
//   {
//     year: 2016
//   },
//   {
//     year: 2017
//   },
//   {
//     year: 2018
//   },
//   {
//     year: 2019
//   },
//   {
//     year: 2020
//   },
//   {
//     year: 2021
//   }
// ]

// TO DO: write an event handler for timeline-button clicked events
// To display the corresponding issues from that year

// TO DO: replace with values gotten from database queries
// let archiveList1 = [
//   {
//     issueDate: "1st January 2021",
//     issueLink: "/"
//   },
//   {
//     issueDate: "1st January 2021",
//     issueLink: "/"
//   },
//   {
//     issueDate: "1st January 2021",
//     issueLink: "/"
//   },
//   {
//     issueDate: "1st January 2021",
//     issueLink: "/"
//   }
// ]

// // TO DO: replace with values gotten from database queries
// let archiveList2 = [
//   {
//     issueDate: "2nd March 2021",
//     issueLink: "/"
//   },
//   {
//     issueDate: "2nd March 2021",
//     issueLink: "/"
//   },
//   {
//     issueDate: "2nd March 2021",
//     issueLink: "/"
//   },
//   {
//     issueDate: "2nd March 2021",
//     issueLink: "/"
//   }
// ]

module.exports = {
    getArchive,
    getRecentYear
};