import express from "express";
import mongoose from "mongoose";
import { PORT, USER, PASSWORD } from "./.config.js";

const app = express();
const DBurl = `mongodb+srv://${USER}:${PASSWORD}@cluster0.zmamtu8.mongodb.net/books-collection?`;

app.get('/', (req, res) => {
    console.log(req.headers);
    res.status(200).send('Hello!');
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