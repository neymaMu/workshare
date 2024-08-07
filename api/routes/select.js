


import express from 'express'
import {SelectText ,getSelect  } from '../controllers/select.js'
import {verifyToken} from '../utils/verifyUser.js'

const router = express.Router() 

router.post("/sele",SelectText)
router.delete("/:id",getSelect)


export default router