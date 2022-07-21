import {Schema, model}  from 'mongoose';


const NewsSchema = new Schema({
    title : {type : String, required : true},
    text : {type : String, required : true},
    img : {type : String, required : false}
})

const NewsItem = model('NewsItem', NewsSchema)
export default NewsItem;