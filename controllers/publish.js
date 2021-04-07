const Publish = require("../app/models/publish.model.js");

const { response } = require("express");

//display the page, with list of unpublished articles as well as date picker
function display(req, res) {
    //TODO
}

//push all articles to db, remove from drafts
function publish(req, res) {
    //TODO
}

module.exports = {
    display,
    publish
}