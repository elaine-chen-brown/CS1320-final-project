// Controller handler to handle functionality in about page

const { response } = require("express");

// handle a get request at '/about' endpoint.
function getAbout(request, response){
  // TO DO: replace with values gotten from database queries
  let aboutBlurb = "The Brown Noser is Brown University’s satirical newspaper. It was founded in 2006. Its current editors-in-chief are Henry Block, Wylie De Groff, Abby Johnson, Jacob Lockwood, and Alex Valenti.";
  response.render('about', {
    title: 'About Us',
    aboutBlurb: aboutBlurb,
    staffMembers: staffMembers
  });
}

// TO DO: replace with values gotten from database queries
let staffMembers = [
  {
    staffPhoto: "images/lover.png",
    staffName: "Lover Taylor",
    staffRole: "Writer",
    staffBlurb: "This is some info about staff writer Taylor from her Lover era aka her best era ever. No contest. This is a fact.",
    authorLink: "/author"
  },
  {
    staffPhoto: "images/red.png",
    staffName: "Red Taylor",
    staffRole: "Writer",
    staffBlurb: "This is some info about staff writer Taylor from her Red era aka her second best era ever. Stay Stay Stay is a bop.",
    authorLink: "/author"
  },
  {
    staffPhoto: "images/fearless.png",
    staffName: "Fearless Taylor",
    staffRole: "Editor",
    staffBlurb: "This is some info about editor Taylor who is Fearless. Love Story was iconic. So was You Belong With Me. Never forget.",
    authorLink: "/author"
  }
]

module.exports = {
    getAbout
};