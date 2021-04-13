// Controller handler to handle functionality in dashboard page

const { response } = require("express");

// handle a get request at '/dashboard' endpoint.
function getDashboard(request, response){
  if (request.session.loggedin) {
    response.render('dashboard', {
      title: 'Dashboard'
    });
	} else {
		response.send('Please login to view this page!');
	}
};

module.exports = {
    getDashboard
};