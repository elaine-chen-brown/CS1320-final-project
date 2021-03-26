// Controller handler to handle functionality in join page

const { response } = require("express");

// handle a get request at '/join' endpoint.
function getJoin(request, response){
  response.render('join', {
    title: 'Join Us',
    joinOpportunities: joinOpportunities
  });
}

// TO DO: replace with values gotten from database queries
let joinOpportunities = [
  {
    joinOp: "Writer"
  },
  {
    joinOp: "Editor"
  },
  {
    joinOp: "Developer"
  }
]

module.exports = {
    getJoin
};