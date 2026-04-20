import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate } from '../middleware/auth';

const router = Router();

// GET all inquiries (Admin Side - PROTECTED)
router.get('/', authenticate, async (req, res) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(inquiries);
  } catch (error) {
    console.error('[GET /inquiries] Error:', error);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

// POST create a new inquiry (User Side - PUBLIC)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are mandatory' });
    }

    const inquiry = await prisma.inquiry.create({
      data: { name, email, subject, message }
    });
    
    res.status(201).json(inquiry);
  } catch (error) {
    console.error('[POST /inquiries] Error:', error);
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
});

// PATCH update status (Reviewed - PROTECTED)
router.patch('/:id/review', authenticate, async (req, res) => {
  try {
    const inquiry = await prisma.inquiry.update({
      where: { id: parseInt(req.params.id as string) },
      data: { status: 'Reviewed' }
    });
    res.json(inquiry);
  } catch (error) {
    console.error('[PATCH /inquiries/:id/review] Error:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// DELETE inquiry (PROTECTED)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await prisma.inquiry.delete({
      where: { id: parseInt(req.params.id as string) }
    });
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('[DELETE /inquiries/:id] Error:', error);
    res.status(500).json({ error: 'Failed to delete inquiry' });
  }
});

export default router;
