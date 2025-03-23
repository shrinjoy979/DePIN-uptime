import express from "express";
import { authMiddleware } from "./middleware";
import { prisma } from "db/client";

const app = express();

app.use(express.json());

app.post("/api/v1/websie", authMiddleware, async (req, res) => {
  const userId = req.userId!;
  const { url } = req.body;

  const data = await prisma.website.create({
    data: {
      userId,
      url,
    },
  });

  res.json({
    id: data.id,
  });
});

app.get("/api/v1/website/status", authMiddleware, (req, res) => {});

app.get("/api/v1/websites", authMiddleware, (req, res) => {});

app.delete("/app/v1/website/", authMiddleware, (req, res) => {});

app.listen(3000);
