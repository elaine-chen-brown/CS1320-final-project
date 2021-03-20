// Controller handler to handle functionality in home page

const { response } = require("express");

// handle a get request at '/' endpoint.
function getAuthor(request, response) {
  let aName = request.params.authorName;
  // do any work you need to do, then
  response.render('author', {
    title: 'Author';
    name: aName;
  });
}

var aName = 'HIIIII';

module.exports = {
    getAuthor
};