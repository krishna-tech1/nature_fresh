import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const content = await prisma.content.findUnique({ where: { id: 1 } });
    if (!content) {
      const newContent = await prisma.content.create({ data: { id: 1 } });
      return res.json(newContent);
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

router.post('/', async (req, res) => {
  try {
    const updatedContent = await prisma.content.upsert({
      where: { id: 1 },
      update: req.body,
      create: { id: 1, ...req.body },
    });
    res.json(updatedContent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update content' });
  }
});

export default router;
