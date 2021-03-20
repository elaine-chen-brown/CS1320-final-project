// Controller handler to handle functionality in home page

const { response } = require("express");

// handle a get request at '/' endpoint.
function getAbout(request, response){
  // do any work you need to do, then
  response.render('about', {
    title: 'About Us'
  });
}

module.exports = {
    getAbout
};