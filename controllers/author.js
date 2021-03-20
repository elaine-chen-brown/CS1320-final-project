// Controller handler to handle functionality in home page

const { response } = require("express");

// handle a get request at '/' endpoint.
function getAuthor(request, response){
  // do any work you need to do, then
  response.render('author', {
    title: 'Author'
  });
}

module.exports = {
    getAuthor
};