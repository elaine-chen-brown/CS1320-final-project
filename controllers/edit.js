// Controller handler to handle functionality in edit drafts page

const { response } = require("express");

// handle a get request at '/admin/edit' endpoint.
function getEdit(request, response){
  response.render('edit', {
    title: 'Edit Articles',
    drafts: drafts
  });
}

// TODO: Replace with values gotten from database queries
drafts = [
  {
    draftTitle: "This is such a cool title it really is!!",
    draftBlurb: "This is the blurb of the article what a cool blurb",
    draftDate: "April 4 2021",
    draftAuthor: "Taylor Swift"
  }
]
module.exports = {
    getEdit
};