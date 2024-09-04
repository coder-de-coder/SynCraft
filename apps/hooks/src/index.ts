import express from 'express';
import { PrismaClient } from '@repo/db';

const app = express();
app.use(express.json());
const client = new PrismaClient();

//todo: add authentication to this route

app.post("/hooks/catch/:userId/:craftId", async (req, res) => {
    const userId = req.params.userId;
    const craftId = req.params.craftId;
    const body1 = req.body;

    //store a new trigger in the db 

    await client.$transaction(async tx => {
        const run = await tx.craftRun.create({
            data : {
                craftId,
                metadata: body1
            }
        })

        await tx.craftRunOutbox.create({
            data : {
                craftRunId : run.id,

            }
        })
    })
    res.json({
        messge : "WebHook Recieved"
    })
})


app.listen(3000, () => {
    console.log('server started')
} );
