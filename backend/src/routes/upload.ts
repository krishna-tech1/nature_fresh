import { Router } from 'express';
import { upload } from '../lib/cloudinary';

const router = Router();

router.post('/', upload.single('image'), (req: any, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ url: req.file.path });
});

export default router;
