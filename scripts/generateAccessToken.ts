require('dotenv').config();
import jwt from 'jsonwebtoken';

export default function generateAccessToken(id : any, roles? : any){
    const secret = process.env.SECRET;
    if (secret){
    const payload = {
        id, 
        roles
    }
    return jwt.sign(payload, secret, {expiresIn : "12h"})}
}