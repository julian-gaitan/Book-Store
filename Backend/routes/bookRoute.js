import express from "express";
import { Book } from "../models/bookModel.js";
import { testForError } from "../app.js";

const router = express.Router();

router.get('/', (req, res) => {
    testForError(async () => {
        const books = await Book.find({});
        res.status(200).send({
            count: books.length,
            books,
        });
    }, res);
});

router.post('/', (req, res) => {
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

router.get('/:id', (req, res) => {
    testForError(async () => {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (book) {
            res.status(200).send(book);
        } else {
            res.status(404).send({ message: `No book was found with the id: ${id}`});
        }
    }, res)
});

router.put('/:id', (req, res) => {
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
});

router.patch('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    testForError(async () => {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send({ message: `No book was found with the id: ${id}`});
        }
    }, res);
});

export default router;