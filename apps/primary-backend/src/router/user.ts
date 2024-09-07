import { Router } from "express";
import { SignupSchema } from "@repo/schemas";
import { PrismaClient } from "@repo/db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";
import { authMiddleware } from "@repo/middleware";

const router = Router();
const client = new PrismaClient();

router.post("/signup", async (req, res) => {
  const body = req.body;

  const parsedData = SignupSchema.safeParse(body);

  // console.log(parsedData.error);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Invalid Inputs entered",
    });
  }

  const userExists = await client.user.findFirst({
    where: {
      email: parsedData.data?.username,
    },
  });

  if (userExists) {
    return res.status(403).json({
      message: "User Already Exists",
    });
  }

  //TODO: Hash the passoword recieved

  //TODO: Email Verification

  await client.user.create({
    data: {
      email: parsedData.data.username,
      password: parsedData.data.password,
      name: parsedData.data.name,
    },
  });

  return res.status(201).json({
    message : "User Created Successfully"
  })
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const parsedData = SignupSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(403).json({
      message: "Invalid Inputs Recieved",
    });
  }

  try {
    const user = await client.user.findFirst({
      where: {
        email: parsedData.data.username,
        password: parsedData.data.password,
      },
    });

    const token = jwt.sign(
      {
        id: user?.id,
      },
      JWT_PASSWORD
    );
  } catch (error) {
    return res.status(403).json({
      message: "Incorrect Username or Password Reciecved",
    });
  }
});

router.get("/user", authMiddleware, async (req, res) => {
  //TODO: Fix type errror from middleware logic
  // @ts-ignore
  const id = req.id;
  const user = await client.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
    },
  });

  return res.json({
    user,
  });
});

export const userRouter = router;
