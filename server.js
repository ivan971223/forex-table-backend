//importing stuff
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import bodyParser from 'body-parser'
import path from 'path'
import fetch from "node-fetch";
import axios from "axios";

//app config
const app = express()
const port = process.env.PORT || 3000

//middlewares
app.use(bodyParser.json());
app.use(cors())


//api routes
app.get('/getForexData', async function (req, res) {
    try {
        let config = {
            headers: {
                apikey: 'VNo1b9YQPwhWNxA12UgZShTkY11FLtG7',
            }
        }
        const result = await axios.get('http://api.apilayer.com/fixer/latest', config)

        if (result?.data?.success) {
            res.status(200).send(result.data)
        }
        else {
            res.status(500).send(result.data.error)
        }
    }
    catch (e) {
        res.status(500).send('fetch error')
    }
})
// For invalid routes
app.get('*', (req, res) => {
    res.send('404! This is an invalid URL.');
});

//listener
app.listen(port, () => console.log(`listening on localhost:${port}`))