// Controller handler to handle functionality in home page

const { response } = require("express");

// handle a get request at '/' endpoint.
function getSearch(request, response){
  // do any work you need to do, then
  response.render('search', {
    title: 'Search'
  });
}

module.exports = {
    getSearch
};