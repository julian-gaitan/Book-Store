import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, USER, PASSWORD } from "./.config.js";

import booksRoute from "./routes/bookRoute.js";

const app = express();
const DBurl = `mongodb+srv://${USER}:${PASSWORD}@cluster0.zmamtu8.mongodb.net/books-collection?`;

// For parsing raw json in the request body
app.use(express.json());

// For handling CORS Policy
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.get('/', (req, res) => {
    res.status(200).send('Bookstore API!');
});

app.use('/books', booksRoute);

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

export async function testForError(func, res) {
    try {
        await func();
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ error: err.message });
    }
}