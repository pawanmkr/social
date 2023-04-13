import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import timeout from 'connect-timeout';
import morgan from 'morgan';
import dotenv from 'dotenv';

import router from './routes/router.js';
import createTables from './controller/createTable.js';
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(morgan('dev'));
app.use(timeout('5000ms'));
app.use((req, res, next) => {
    if (req.timedout) {
        res.status(408).send("Request timed out")
    }
    next()
});

app.use(function(err, req, res, next) {
    console.log(err)
    res.status(500).send({ Message: "something went wrong on the server" })
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: '*'
}));

createTables();

/* 
    this is the higher order function that returns a promise
    it takes the function and (req, res, next) as arguments
    and if error occurs anywhere in the code it will be catched
    by catch(). once catched the error can be handled accordingly
    it is the alternative way to catch errors other than
    try-catch that reduces the code and overall the code looks
    cleaner
*/
const use = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next)

app.use('/api', use(router));

app.listen(port, () => console.log(`app listening on port ${port}!`));