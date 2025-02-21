import express from 'express';
import {
  getRegions,
  exportRegionsToPDF,
} from '../controllers/regionController';

const router = express.Router();

router.get('/regions', getRegions);
//router.get('/regions/export/pdf', exportRegionsToPDF);

export default router;
