// Controller handler to handle functionality in dashboard page

const { response } = require("express");

// handle a get request at '/admin/dashboard' endpoint.
function getDashboard(request, response){
  if (request.session.loggedin) {
		//response.send('Welcome back, ' + request.session.username + '!');
    response.render('dashboard', {
      title: 'Dashboard'
    });
	} else {
		response.send('Please login to view this page!');
    // response.end();
	}
};

  /*response.render('dashboard', {
    title: 'Dashboard'
  }
  );
}*/

module.exports = {
    getDashboard
};