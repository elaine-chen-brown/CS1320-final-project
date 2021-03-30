// Controller handler to handle functionality in about page
const About = require("../app/models/about.model.js");

const { response } = require("express");

// handle a get request at '/about' endpoint.
function getAbout(request, response){
  // the brown noser is account 3 in accounts table
    var findAboutBlurb = function getAboutBlurb(id) {
        return new Promise((resolve, reject) => {
            About.getBlurb(id, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        reject(`Not found blurb for account id ${id}.`);
                    } else {
                        reject("Error retrieving blurb for account with id " + id);
                    }
                }
                else {
                    resolve(data);
                }
            })
        })
    }
    var findActiveStaff = function getActiveStaff() {
        return new Promise((resolve, reject) => {
            About.getActiveStaff((err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        reject(`Didn't find authors`);
                    } else {
                        reject("Error retrieving authors");
                    }
                }
                else {
                    resolve(data);
                }
            })
        })
    }
    findAboutBlurb(3).then(blurb => {
        findActiveStaff().then(staff => {
            var buildAuthor = function buildAuthor(authorEntry){
                let first_name = (authorEntry.author).split(" ")[0];
                let title = authorEntry.title.toLowerCase();
                author_to_add = {
                    staffPhoto: "/images/lover.png",
                    staffName: authorEntry.author,
                    staffRole: authorEntry.title,
                    staffBlurb: `${first_name} is a ${title} at The Noser. This is a blurb about ${first_name} as an author.`,
                    authorLink: `/author/${authorEntry.authorid}`
                }
                return author_to_add;
            }
            let staffMembers = staff.map(buildAuthor);
            // BLURB IN DB IS INCONSISTENT WITH WHAT IS CURRENTLY ON SITE
            let aboutBlurb = blurb.metaDescription;
            response.render('about', {
                title: 'About Us',
                aboutBlurb: aboutBlurb,
                staffMembers: staffMembers
            });
        })
    })
}

// TO DO: replace with values gotten from database queries
// let staffMembers = [
//   {
//     staffPhoto: "images/lover.png",
//     staffName: "Lover Taylor",
//     staffRole: "Writer",
//     staffBlurb: "This is some info about staff writer Taylor from her Lover era aka her best era ever. No contest. This is a fact.",
//     authorLink: "/author"
//   },
//   {
//     staffPhoto: "images/red.png",
//     staffName: "Red Taylor",
//     staffRole: "Writer",
//     staffBlurb: "This is some info about staff writer Taylor from her Red era aka her second best era ever. Stay Stay Stay is a bop.",
//     authorLink: "/author"
//   },
//   {
//     staffPhoto: "images/fearless.png",
//     staffName: "Fearless Taylor",
//     staffRole: "Editor",
//     staffBlurb: "This is some info about editor Taylor who is Fearless. Love Story was iconic. So was You Belong With Me. Never forget.",
//     authorLink: "/author"
//   }
// ]

module.exports = {
    getAbout
};