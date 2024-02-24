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
    res.status(200).send('Hello!');
});

app.post('/books', async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;
        if (!title || !author || !publishYear) {
            return res.status(400).send({ error: 'All the fields are require: title, author, publishYear' });
        }
        const newBook = {
            title,
            author,
            publishYear,
        };
        console.log(newBook);
        const book = await Book.create(newBook);
        res.status(201).send(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ error: err.message });
    }
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