import { Router } from "express";
import { PrismaClient } from "@repo/db";

const router = Router();
const client = new PrismaClient();

router.get('/available', async(req,res)=>{
    const availableActions = await client.availableAction.findMany({});

    res.json({
        availableActions
    })
})

export const actionRouter = router;