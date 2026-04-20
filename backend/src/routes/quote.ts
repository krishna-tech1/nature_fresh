import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate } from '../middleware/auth';

const router = Router();

// GET all quotes (for admin panel - PROTECTED)
router.get('/', authenticate, async (req, res) => {
  try {
    const quotes = await prisma.quote.findMany({
      orderBy: { createdAt: 'desc' },
      include: { product: { select: { name: true, images: true } } }
    });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});

// POST create a new quote (from user side - PUBLIC)
router.post('/', async (req, res) => {
  try {
    const { name, company, email, quantity, productId, productName } = req.body;
    if (!name || !email || !productId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const quote = await prisma.quote.create({
      data: { name, company, email, quantity, productId: parseInt(productId), productName }
    });
    res.status(201).json(quote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit quote' });
  }
});

// PATCH mark a quote as reviewed (PROTECTED)
router.patch('/:id/review', authenticate, async (req, res) => {
  try {
    const quote = await prisma.quote.update({
      where: { id: parseInt(req.params.id as string) },
      data: { status: 'Reviewed' }
    });
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quote status' });
  }
});

// DELETE a quote (PROTECTED)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await prisma.quote.delete({ where: { id: parseInt(req.params.id as string) } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quote' });
  }
});

export default router;
