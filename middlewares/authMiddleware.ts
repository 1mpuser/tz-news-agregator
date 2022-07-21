const jwt = require('jsonwebtoken');
import { Request, Response } from "express";
export default function authMiddleware(req : any, res : Response, next : any) {
    if (req.method === 'OPTIONS') next();
    try { //Bearer authentification
        const token = req.headers.authorization.split(' ')[1]; //cause first is type of token and token is about second place
        // console.log(token)
		if (!token) {
			return res.status(401).json({ message: 'Not authorised' });
		}
		const decoded = jwt.verify(token, process.env.SECRET);
		req.user = decoded;
		next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message : "Not authorised"});
    }
}