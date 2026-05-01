import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(products);
  } catch (error) {
    console.error('[GET /products] Error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: parseInt(req.params.id as string) } });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

router.post('/', authenticate, async (req, res) => {
  try {
    const { name, description, category, images, status } = req.body;
    
    if (!name || !description || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newProduct = await prisma.product.create({ 
      data: { name, description, category, images, status } 
    });
    res.json(newProduct);
  } catch (error) {
    console.error('[POST /products] Error:', error);
    res.status(500).json({ error: 'Failed to create product. Database error.' });
  }
});

router.put('/:id', authenticate, async (req, res) => {
  try {
    const { name, description, category, images, status } = req.body;
    const id = parseInt(req.params.id as string);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { name, description, category, images, status },
    });
    res.json(updatedProduct);
  } catch (error) {
    console.error('[PUT /products] Error:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: parseInt(req.params.id as string) } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;
