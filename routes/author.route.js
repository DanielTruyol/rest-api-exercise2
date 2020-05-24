const { Router } = require('express');
const router = Router();
const _ = require('lodash');

const authors = require('../authors.json');

const books = require('../books.json');
const Request = require("request");

router.get('/authors', (req, res) => {
    res.json(authors);
});

router.get('/authors/:id', (req, res) => {
    const id = req.params.id;
    _.each(authors, (author) => {
        if (author.id == id){
            res.json({ author });
        }
    })
    res.json({ 'GET': 'No se encontro un autor con esa id' });
});

router.post('/authors', (req, res) => {
    const { name, lastname } = req.body;
    if (name && lastname){
        const newAuthor = { ...req.body };
        authors.push(newAuthor);
        res.json({ 'added': 'ok '});
    }else{
        res.status(400).json({ 'statusCode': 'BadRequest'});
    }
});

router.delete('/authors', (req, res) => {
    res.status(400).json({ 'statusCode': 'BadRequest No ID' });
});

router.delete('/authors/:id', (req, res) => {
    const id = req.params.id;
    _.remove(authors, (author) => {
        _.each(books, (book) => {
            if (id == book.authorId){
                console.log(id);
                Request.delete(`http://localhost:3000/api/books/${book.id}`, (error, response, body) => {
                    if(error){
                         return console.dir(error);
                    }
                });
            }
        })
        if(author.id === id){
            res.json({ 'deleted': 'ok' });
            return author.id == id;
        }
    })
    res.json({ 'No deleted': 'No se encontro un autor con esa id' });
    //res.json(authors); 
});

router.put('/authors', (req, res) => {
    res.status(400).json({ 'statusCode': 'BadRequest No ID'});
});

router.put('/authors/:id', (req, res) => {
    const id = req.params.id;
    const { name, lastname } = req.body;
    if (name && lastname){
        _.each(authors, (author) => {
            if (author.id == id){
                author.name = name;
                author.lastname = lastname;
                res.json({ 'modified': 'ok '});
            }
        })
        res.json({ 'No modified': 'No se encontro un autor con esa id' });
    }else{
        res.status(400).json({ 'statusCode': 'BadRequest'});
    }
});

module.exports = router;

//entregar