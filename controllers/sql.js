const mysql = require('mysql2');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'noser_small.sql'
});

function getArticle(article) {
    //Given an article name, fetch article information
}

function getAuthor(author) {
    //Given an author name, fetch author information
}

function getSection(section) {
    //Given a section, get all articles in section
}

function searchArticles() {
    //search by keyword
    //https://stackoverflow.com/questions/7172947/how-do-i-create-sql-query-for-searching-partial-matches/7173115
}

function searchAuthors() {
    //search by author name
}