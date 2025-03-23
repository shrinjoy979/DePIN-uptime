import express from "express";
import { authMiddleware } from "./middleware";
import { prisma } from "db/client";

const app = express();

app.use(express.json());

app.post("/api/v1/website", authMiddleware, async (req, res) => {
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

app.get("/api/v1/website/status", authMiddleware, async (req, res) => {
  const websiteId = req.query.websiteId! as unknown as string;
  const userId = req.userId;

  const data = await prisma.website.findFirst({
    where: {
      id: websiteId,
      userId,
      disabled: false,
    },
    include: {
      ticks: true,
    },
  });

  res.json(data);
});

app.get("/api/v1/websites", authMiddleware, async (req, res) => {
  const userId = req.userId!;

  const websites = await prisma.website.findMany({
    where: {
      userId,
      disabled: false,
    },
  });

  res.json({ websites });
});

app.delete("/app/v1/website/", authMiddleware, async (req, res) => {
  const websiteId = req.body.websiteId;
  const userId = req.userId!;

  await prisma.website.update({
    where: {
      id: websiteId,
      userId,
    },
    data: {
      disabled: true,
    },
  });

  res.json({ message: "Deleted successfully" });
});

app.listen(3000);
