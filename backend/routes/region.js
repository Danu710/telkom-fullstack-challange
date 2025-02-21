import express from 'express';
import { getRegions } from '../controllers/regionController.js';

const router = express.Router();

/**
 * @swagger
 * http://localhost:4501/api/regions?page=1&limit=5:
 *   get:
 *     summary: Ambil daftar region dengan filter
 *     description: Mendapatkan daftar region berdasarkan parameter query yang diberikan.
 *     tags:
 *       - Regions
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Nomor halaman (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Jumlah data per halaman (default 5)
 *       - in: query
 *         name: propinsi
 *         schema:
 *           type: string
 *         description: Filter berdasarkan propinsi
 *       - in: query
 *         name: kab_kota
 *         schema:
 *           type: string
 *         description: Filter berdasarkan kabupaten/kota
 *       - in: query
 *         name: kecamatan
 *         schema:
 *           type: string
 *         description: Filter berdasarkan kecamatan
 *       - in: query
 *         name: kelurahan
 *         schema:
 *           type: string
 *         description: Filter berdasarkan kelurahan
 *       - in: query
 *         name: nama
 *         schema:
 *           type: string
 *         description: Filter berdasarkan nama
 *     responses:
 *       200:
 *         description: Data region berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Data retrieved successfully"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalRecords:
 *                       type: integer
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       example: 20
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       propinsi:
 *                         type: string
 *                         example: "Jawa Barat"
 *                       kab_kota:
 *                         type: string
 *                         example: "Bandung"
 *                       kecamatan:
 *                         type: string
 *                         example: "Coblong"
 *                       kelurahan:
 *                         type: string
 *                         example: "Dago"
 *                       nama:
 *                         type: string
 *                         example: "Region A"
 *       500:
 *         description: Kesalahan server
 */
router.get('/', getRegions);

export default router;
