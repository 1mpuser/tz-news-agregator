import { Request, Response } from "express";
import { INewsItem } from "../types/types";
import NewsItem from "../models/NewsItem";
const uuid = require('uuid');
const path = require('path');
const fs = require("fs");


interface MulterRequest extends Request {
    files?: any;
    file? : any;
}


class NewsController{
    async getAll(req : Request, res : Response){
        try {
            const news = await NewsItem.find();
            res.json(news)
        } catch (error) {
            console.log(error)
            res.status(400).json({message : "Get news error"})
        }
    }
    async getOne(req : Request, res : Response){
        try {
            const {id} = req.params;
            const newsItem = await NewsItem.find();
            const tmpId = +id;
            console.log(tmpId)
            const item = newsItem[tmpId]
            return res.json(item);
        } catch (error) {
            console.log(error);
            res.status(403).json({message : "NewsItem not found"})
        }
    }
    async create(req : MulterRequest, res : Response){
        try {
            const { title, text, author, dateOfCreate } = req.body;
            console.log(req.body)
            const {img} = req.files;
            //if (!isAuth) return res.json({message : "Not authorised user"})
            const fileName = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const newsItem = new NewsItem({
                title,
                text,
                img: fileName,
                author,
                dateOfCreate
            });
            await newsItem.save()
            return res.json(newsItem)
        } catch (error) {
            console.log(error);
            res.status(403).json({message : "Error while creating"}, )
        }
    }
    async edit(req : MulterRequest, res : Response){

        try {
            const {id} = req.params;
            const {title, text, author, dateOfCreate} = req.body;
            let img : any = undefined //srly any
            const file = req.files;
            if (file) img = file.img; //idk why not worked with destruction so i made this manually
            const newsItems = await NewsItem.find();
            const tmpId = +id;
            const neededItem = newsItems[tmpId];
            if (dateOfCreate) await neededItem.updateOne({dateOfCreate})
            if (author) await neededItem.updateOne({author})
            if (title) await neededItem.updateOne({title})
            if (text) await neededItem.updateOne({text})
            if (img) {
                const tmpPath = path.resolve(__dirname, '..','static', neededItem.img)
                fs.unlinkSync(tmpPath);
                const anotherFileName = uuid.v4() + '.jpg';
                img.mv(path.resolve(__dirname, '..', 'static', anotherFileName));
                await neededItem.updateOne({img : anotherFileName});
            }
            return res.json(neededItem);
        } catch (error) {
            console.log(error);
            res.json({message : "Error while editing"})
        }
    }
    async delete(req : Request, res : Response){
        try {
            const {id} = req.params;
            const newsItems = await NewsItem.find();
            const tmpId = +id;
            const neededItem = newsItems[tmpId];
            const tmpPath = path.resolve(__dirname, '..', 'static', neededItem.img);
            fs.unlinkSync(tmpPath);
            await neededItem.delete();
            return res.json(neededItem);
        } catch (error) {
            console.log(error);
            res.json({message : "Error while deleting item"})
        }
    }
}
export default NewsController