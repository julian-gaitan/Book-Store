import express from "express";
import mongoose from "mongoose";
import { PORT, USER, PASSWORD } from "./.config.js";

import { Book } from "./models/bookModel.js";

const app = express();
const DBurl = `mongodb+srv://${USER}:${PASSWORD}@cluster0.zmamtu8.mongodb.net/books-collection?`;

// For parsing raw json in the request body
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req.headers);
    res.status(200).send('Bookstore API!');
});

async function testForError(func, res) {
    try {
        await func();
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ error: err.message });
    }
}

app.route('/books')
    .get(async (req, res) => {
        testForError(async () => {
            const books = await Book.find({});
            res.status(200).send({
                count: books.length,
                books,
            });
        }, res);
    })
    .post(async (req, res) => {
        testForError(async () => {
            const { title, author, publishYear } = req.body;
            if (!title || !author || !publishYear) {
                return res.status(400).send({ error: 'All the fields are required: title, author, publishYear' });
            }
            const newBook = {
                title,
                author,
                publishYear,
            };
            const book = await Book.create(newBook);
            res.status(201).send(book);
        }, res);
    });

app.route('/books/:id')
    .get(async (req, res) => {
        testForError(async () => {
            const { id } = req.params;
            const book = await Book.findById(id);
            if (book) {
                res.status(200).send(book);
            } else {
                res.status(404).send({ message: `No book was found with the id: ${id}`});
            }
        }, res)
    })
    .put(async (req, res) => {
        testForError(async () => {
            const { title, author, publishYear } = req.body;
            const { id } = req.params;
            if (!title || !author || !publishYear) {
                return res.status(400).send({ error: 'All the fields are required: title, author, publishYear' });
            }
            const replaceBook = {
                title,
                author,
                publishYear,
            };
            const result = await Book.findByIdAndUpdate(id, replaceBook, { new: true });
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(404).send({ message: `No book was found with the id: ${id}`});
            }
        }, res);
    })
    .patch(async (req, res) => {
        testForError(async () => {
            const { title, author, publishYear } = req.body;
            const { id } = req.params;
            if (!title && !author && !publishYear) {
                return res.status(400).send({ error: 'At least one field is required: title, author, publishYear' });
            }
            const updateBookBook = {
                ...req.body,
            };
            const result = await Book.findByIdAndUpdate(id, updateBookBook, { new: true });
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(404).send({ message: `No book was found with the id: ${id}`});
            }
        }, res);
    });


mongoose.connect(DBurl)
    .then(() => {
        console.log('App connected to DB');
        app.listen(PORT, () => {
            console.log(`App listening on port: ${PORT}`);
        });        
    })
    .catch((err) => {
        console.log(err);
    });