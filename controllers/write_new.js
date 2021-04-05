const New = require("../app/models/write_new.model.js");

const { response } = require("express");

//TODO
function display(req, res) {
    res.render('write_new', {
        title: 'New article' 
    });
}

function handleNew(req, res) {
    console.log(req.body);
    //pass along req.body to New.save
    //res.render that Article has been saved
}


module.exports = {
    display,
    handleNew
};