// Controller handler to handle functionality in login page

const { response } = require("express");

// handle a get request at '/join' endpoint.
function getLogin(request, response){
  response.render('login', {
    title: 'Login'
  });
}

module.exports = {
    getLogin
};