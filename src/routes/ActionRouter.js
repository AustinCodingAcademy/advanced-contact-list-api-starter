import { Router } from 'express';
import ActionController from '../controllers/ActionController';

const router = Router();

router.get('/actions', ActionController.list);

router.post('/actions', ActionController.create);

router.delete('/actions/:_id', ActionController.remove);

export default router;
