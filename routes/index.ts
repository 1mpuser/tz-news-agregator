import { Router } from "express";
const router =  Router();
const authRouter = require('./authRouter')
const newsRouter = require('./newsRouter')


router.use('/auth', authRouter)
router.use('/news', newsRouter)

module.exports = router;