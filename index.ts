require('dotenv').config();
import express from 'express'
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const router = require('./routes/index')

const app = express();



app.use(express.json())
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