var express = require('express');
var router = express.Router();

// rethinkdb
const r = require('rethinkdb');
var databaseName = process.env.RDB_DATABASE;
var tableName = "books"; // set table name

/* add book */
router.post('/', (request,response ) => {
    let book ={
        'name': request.body.name,
        'author': request.body.author
    };
  
    r.db(databaseName).table(tableName)
        .insert(book)
        .run(request._rdb)
        .then(cursor => cursor.toArray())
        .then( result => {
            // logic if you want to set
        })
        .catch(error => console.log(error));

    // response
    let data = {
        'success': true,
        'message': "Book successfully added",
    };
    response.json(data);
});

/* get all books */
router.get('/', (request,response ) => {

    r.db(databaseName).table(tableName)
        .orderBy(r.desc("id"))
        .run(request._rdb)
        .then(cursor => cursor.toArray())
        .then(result => {
            // logic if you want to set
            response.json(result);
        })
        .catch( error => console.log(error));
});

/* get single book */
router.get('/:book_id', (request,response ) => {
    let book_id = request.params.book_id;

    r.db(databaseName).table(tableName)
        .get(book_id)
        .run(request._rdb)
        .then(result => {
            // logic if you want to set
            response.json(result);
        })
        .catch( error => console.log(error));
});

// update book
router.put( '/:book_id', (request,response ) => {
  let book_id = request.params.book_id;

  r.db(databaseName).table(tableName)
      .get( book_id )
      .update( {
        'name': request.body.name,
        'author': request.body.author
      })
      .run( request._rdb )
      .then(cursor => cursor.toArray() )
      .then(result => {
          response.send(result);
      })
      .catch(error => console.log(error));

      // response
      let data = {
          'success': true,
          'message': "Book successfully updated",
      };
      response.json(data);
});

// delete book
router.delete( '/:book_id', (request,response ) => {
  let book_id = request.params.book_id;

  r.db(databaseName).table(tableName)
      .get(book_id)
      .delete()
      .run(request._rdb)
      .then(cursor => cursor.toArray() )
      .then(result => {
        response.send(result);
      })
      .catch(error => console.log(error));

      // response
      let data = {
          'success': true,
          'message': "Book successfully deleted",
      };
      response.json(data);
});

module.exports = router;