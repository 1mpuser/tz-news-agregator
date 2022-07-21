import { Request, Response } from "express"
class AuthController {
    async registration(req : Request, res : Response)  {
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
    async login(req : Request, res : Response)  {
        try {
            
        } catch (error) {
        console.log(error)
        }
    }
    async getUsers(req : Request, res : Response)  {
        try {
            res.json("Server working");
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = new AuthController()