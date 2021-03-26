// Controller handler to handle functionality in archive page

const { response } = require("express");

// handle a get request at '/archive' endpoint.
function getArchive(request, response){
  // TO DO: replace with values gotten from database queries
  response.render('archive', {
    title: 'Archive',
  });
}

module.exports = {
    getArchive
};