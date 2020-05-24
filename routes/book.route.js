const { Router } = require('express');
const router = Router();
const _ = require('lodash');

const books = require('../books.json');

//const Request = require("request");
const authors = require('../authors.json');

router.get('/books', (req, res) => {
    jsonArray1 = [];
    _.each(books, (book) => {
        
        jsonArray1 = jsonArray1.concat(book);

        _.each(authors, (author) => {
            if (author.id == book.authorId){
                jsonArray1 = jsonArray1.concat(author);
            }
        })
           
    })
    res.json(jsonArray1);
});   

router.post('/books', (req, res) => {
    const { name, authorId } = req.body;
    if (name && authorId){
        const newBook = { ...req.body };
        books.push(newBook);
        res.json({ 'added': 'ok '});
    }else{
        res.status(400).json({ 'statusCode': 'BadRequest'});
    }
});

router.delete('/books', (req, res) => {
    res.status(400).json({ 'statusCode': 'BadRequest No ID' });
});

router.delete('/books/:id', (req, res) => {
    const id = req.params.id;
    _.remove(books, (book) => {
        if(book.id == id){
            res.json({ 'deleted': 'ok' });
            return book.id == id
        } 
    })
    res.json({ 'No deleted': 'No se encontro un libro con esa id' });
    //res.json(books);  
}); 

router.put('/books', (req, res) => {
    res.status(400).json({ 'statusCode': 'BadRequest No ID'});
});

router.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const { name, authorId } = req.body;
    if (name && authorId){
        _.each(books, (book) => {
            if (book.id == id){
                book.name = name;
                book.authorId = authorId;
                res.json({ 'modified': 'ok' });
            }
        })
        res.json({ 'No modified': 'No se encontro un libro con esa id' });
    }else{
        res.status(400).json({ 'statusCode': 'BadRequest'});
    }
});

module.exports = router;

/* router.get('/books', (req, res) => {

    jsonArray1 = [];

    _.each(books, (book) => {
        jsonArray2 = [];
        jsonArray1 = jsonArray1.concat(book);

        Request.get(`http://localhost:3000/api/authors/${book.authorId}`, (error, response, body) => { 
            if(error){
                return console.dir(error);
            }
            author = JSON.parse(body);
            console.log(author);
            //res.json(author);
            //res.json(author.name);
            //jsonArray1 = jsonArray1.concat(author);
            //jsonArray1 = jsonArray1.concat(body);
            jsonArray2 = jsonArray2.concat(JSON.parse(body));
        });    
        //res.json(JSON.parse(jsonArray2));     
        res.json(jsonArray2); 
    })
    //res.json(jsonArray1);
});  */

//entregar