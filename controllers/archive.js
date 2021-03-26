// Controller handler to handle functionality in archive page

const { response } = require("express");

// handle a get request at '/archive' endpoint.
function getArchive(request, response){
  response.render('archive', {
    title: 'Archive',
    timelineYears: timelineYears,
    archiveList1: archiveList1,
    archiveList2: archiveList2
  });
}

let timelineYears = [
  {
    year: 2006
  },
  {
    year: 2007
  },
  {
    year: 2008
  },
  {
    year: 2009
  },
  {
    year: 2010
  },
  {
    year: 2011
  },
  {
    year: 2012
  },
  {
    year: 2013
  },
  {
    year: 2014
  },
  {
    year: 2015
  },
  {
    year: 2016
  },
  {
    year: 2017
  },
  {
    year: 2018
  },
  {
    year: 2019
  },
  {
    year: 2020
  },
  {
    year: 2021
  }
]

// TO DO: write an event handler for timeline-button clicked events
// To display the corresponding issues from that year

// TO DO: replace with values gotten from database queries
let archiveList1 = [
  {
    issueDate: "1st January 2021",
    issueLink: "/"
  },
  {
    issueDate: "1st January 2021",
    issueLink: "/"
  },
  {
    issueDate: "1st January 2021",
    issueLink: "/"
  },
  {
    issueDate: "1st January 2021",
    issueLink: "/"
  }
]

// TO DO: replace with values gotten from database queries
let archiveList2 = [
  {
    issueDate: "2nd March 2021",
    issueLink: "/"
  },
  {
    issueDate: "2nd March 2021",
    issueLink: "/"
  },
  {
    issueDate: "2nd March 2021",
    issueLink: "/"
  },
  {
    issueDate: "2nd March 2021",
    issueLink: "/"
  }
]

module.exports = {
    getArchive
};