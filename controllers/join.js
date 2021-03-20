// Controller handler to handle functionality in home page

const { response } = require("express");

// handle a get request at '/' endpoint.
function getJoin(request, response){
  // do any work you need to do, then
  response.render('join', {
    title: 'Join Us'
  });
}

module.exports = {
    getJoin
};