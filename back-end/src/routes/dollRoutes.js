import { Router } from 'express';
import { dollController } from '../controllers/dollController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', dollController.getAll);
router.get('/stats', dollController.getStats);
router.get('/:id', dollController.getById);
router.post('/', dollController.create);
router.put('/:id', dollController.update);
router.delete('/:id', dollController.delete);

export default router;
