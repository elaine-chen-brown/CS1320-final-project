// Controller handler to handle functionality in dashboard page

const { response } = require("express");

// handle a get request at '/admin/dashboard' endpoint.
function getDashboard(request, response){
  response.render('dashboard', {
    title: 'Dashboard'
  });
}

module.exports = {
    getDashboard
};