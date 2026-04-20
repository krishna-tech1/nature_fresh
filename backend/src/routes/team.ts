import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const team = await prisma.teamMember.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newMember = await prisma.teamMember.create({ data: req.body });
    res.json(newMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create member' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedMember = await prisma.teamMember.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update member' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prisma.teamMember.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete member' });
  }
});

export default router;
