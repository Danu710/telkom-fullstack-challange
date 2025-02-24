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
 *                       example: 97794
 *                     totalPages:
 *                       type: integer
 *                       example: 19559
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
 *                       region_id:
 *                         type: string
 *                         example: "5307082020"
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
 *             example:
 *               success: true
 *               message: "Data retrieved successfully"
 *               pagination:
 *                 totalRecords: 97794
 *                 totalPages: 19559
 *                 currentPage: 1
 *                 limit: 5
 *               data:
 *                 - region_id: "5307082020"
 *                   propinsi: "Jawa Barat"
 *                   kab_kota: "Bandung"
 *                   kecamatan: "Coblong"
 *                   kelurahan: "Dago"
 *                   nama: "Region A"
 *                 - region_id: "5307082021"
 *                   propinsi: "Jawa Tengah"
 *                   kab_kota: "Semarang"
 *                   kecamatan: "Tembalang"
 *                   kelurahan: "Sendangmulyo"
 *                   nama: "Region B"
 *                 - region_id: "5307082022"
 *                   propinsi: "Jawa Timur"
 *                   kab_kota: "Surabaya"
 *                   kecamatan: "Wonokromo"
 *                   kelurahan: "Darmo"
 *                   nama: "Region C"
 *                 - region_id: "5307082023"
 *                   propinsi: "DKI Jakarta"
 *                   kab_kota: "Jakarta Selatan"
 *                   kecamatan: "Kebayoran Baru"
 *                   kelurahan: "Melawai"
 *                   nama: "Region D"
 *                 - region_id: "5307082024"
 *                   propinsi: "Bali"
 *                   kab_kota: "Denpasar"
 *                   kecamatan: "Denpasar Selatan"
 *                   kelurahan: "Sanur"
 *                   nama: "Region E"
 *       500:
 *         description: Kesalahan server
 */
router.get('/', getRegions);

export default router;
