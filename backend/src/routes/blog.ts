import { Router } from 'express';
import prisma from '../lib/prisma';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newPost = await prisma.blogPost.create({ data: req.body });
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedPost = await prisma.blogPost.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prisma.blogPost.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

export default router;
