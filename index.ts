require('dotenv').config();
const cors = require('cors');
import express from 'express'
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const router = require('./routes/index');
const fileUpload = require('express-fileupload');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(express.static(path.resolve(__dirname, 'static'))); // route + path for take a closer look at the file
app.use(fileUpload({}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', router);


const start = async () =>{
    try {
        await mongoose.connect('mongodb+srv://krek:kreknekek@fullstack-tz.fmtn4.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error);
    }
}

start();