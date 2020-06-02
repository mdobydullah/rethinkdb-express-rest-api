var express = require('express');
var router = express.Router();

// rethinkdb
const r = require('rethinkdb');
var databaseName = process.env.RDB_DATABASE;
var tableName = "books"; // set table name

/* home page */
router.get('/', (request, response ) => {
    response.render('index', { title: 'MyNotePaper' });
});

/* create database and table */
router.get('/create-db-table', (request, response ) => {
    // create db
    r.dbCreate(databaseName).run(request._rdb);
    console.log('Database ' + databaseName + ' created!');

    // create table
    r.db(databaseName).tableCreate(tableName).run(request._rdb);
    console.log('Table ' + tableName + ' created!');

    message = "Successfully created database '" + databaseName + "' & table '" + tableName + "'";

    // render
    response.render('notice', { title: 'RethinkDB', message: message });
});

module.exports = router;
