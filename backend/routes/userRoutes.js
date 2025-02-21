import express from 'express';
import {
  getUsers,
  getRegions,
  exportRegionsToPDF,
  exportRegionsToCsv,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsers);
router.get('/regions', getRegions);
router.get('/regions/export/pdf', exportRegionsToPDF);
router.get('/regions/export/csv', exportRegionsToCsv);

export default router;
