import { Router } from "express";
import { PrismaClient } from "@repo/db";

const router = Router();
const client = new PrismaClient();

router.get('/available', async(req,res)=>{
    const availabeTriggers = await client.availableTrigger.findMany({});

    return res.json({
        availabeTriggers
    })
})

export const triggerRouter = router;