import { Router } from "express";
import { authMiddleware } from "@repo/middleware";
import { CraftCreateSchema } from "@repo/schemas";
import { PrismaClient } from "@repo/db";

const client = new PrismaClient();
const router = Router();

router.post("/", authMiddleware, async (req, res) => {
  // @ts-ignore
  const id: string = req.id;
  const body = req.body;
  const parsedData = CraftCreateSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const craftId = await client.$transaction(async (tx) => {
    const craft = await client.craft.create({
      data: {
        userId: parseInt(id),
        triggerId: "",
        actions: {
          create: parsedData.data.actions.map((x, index) => ({
            actionId: x.availableActionId,
            sortingOrder: index,
            metadata: x.actionMetadata,
          })),
        },
      },
    });

    const trigger = await tx.trigger.create({
      data: {
        triggerId: parsedData.data.availableTriggerId,
        craftId: craft.id,
      },
    });

    await tx.craft.update({
      where: {
        id: craft.id,
      },
      data: {
        triggerId: trigger.id,
      },
    });

    return craft.id;
  });
  return res.json({
    craftId,
  });
});

router.get("/", authMiddleware, async (req, res) => {
  // @ts-ignore
  const id = req.id;
  const crafts = await client.craft.findMany({
    where: {
      userId: id,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });

  return res.json({
    crafts,
  });
});

router.get("/:craftId", authMiddleware, async (req, res) => {
  //@ts-ignore
  const id = req.id;
  const craftId = req.params.craftId;

  const craft = await client.craft.findFirst({
    where: {
      id: craftId,
      userId: id,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });

  return res.json({
    craft,
  });
});

export const craftRouter = router;
