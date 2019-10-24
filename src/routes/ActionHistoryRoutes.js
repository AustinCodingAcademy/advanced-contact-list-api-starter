import {Router} from 'express';
import actionHistoryControllers from '../controllers/ActionHistoryControllers';

const router = Router();

router.get('/actionHistory', (request, response, next) => {
  actionHistoryControllers.listActionHistory(request, response, next);
});

router.delete('/actionHistory/:_id', (request, response, next) => {
  actionHistoryControllers.removeActionHistoryItem(request, response, next);
});

router.post('/actionHistory', (request, response, next) => {
  actionHistoryControllers.createActionHistoryItem(request, response, next);
});

export default router;
