import pool from '../config/db.js';
import PDFDocument from 'pdfkit';

export const getRegions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const { propinsi, kecamatan, kelurahan, nama } = req.query;

    let filters = [];
    let values = [];
    let index = 1;

    if (propinsi) {
      filters.push(`propinsi ILIKE $${index}`);
      values.push(`%${propinsi}%`);
      index++;
    }
    if (kecamatan) {
      filters.push(`kecamatan ILIKE $${index}`);
      values.push(`%${kecamatan}%`);
      index++;
    }
    if (kelurahan) {
      filters.push(`kelurahan ILIKE $${index}`);
      values.push(`%${kelurahan}%`);
      index++;
    }
    if (nama) {
      filters.push(`nama ILIKE $${index}`);
      values.push(`%${nama}%`);
      index++;
    }

    let query = 'SELECT * FROM temp_regions';
    let countQuery = 'SELECT COUNT(*) FROM temp_regions';

    if (filters.length > 0) {
      query += ` WHERE ${filters.join(' AND ')}`;
      countQuery += ` WHERE ${filters.join(' AND ')}`;
    }

    query += ` ORDER BY updated DESC LIMIT $${index} OFFSET $${index + 1}`;
    values.push(limit, offset);

    const countResult = await pool.query(
      countQuery,
      values.slice(0, index - 1)
    );
    const totalRecords = parseInt(countResult.rows[0].count);

    const result = await pool.query(query, values);

    res.json({
      success: true,
      message: 'Data retrieved successfully',
      pagination: {
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
        currentPage: page,
        limit: limit,
      },
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const exportRegionsToPDF = async (req, res) => {
  try {
    const { propinsi, kecamatan, kelurahan, nama } = req.query;

    let filters = [];
    let values = [];
    let index = 1;

    if (propinsi) {
      filters.push(`propinsi ILIKE $${index}`);
      values.push(`%${propinsi}%`);
      index++;
    }
    if (kecamatan) {
      filters.push(`kecamatan ILIKE $${index}`);
      values.push(`%${kecamatan}%`);
      index++;
    }
    if (kelurahan) {
      filters.push(`kelurahan ILIKE $${index}`);
      values.push(`%${kelurahan}%`);
      index++;
    }
    if (nama) {
      filters.push(`nama ILIKE $${index}`);
      values.push(`%${nama}%`);
      index++;
    }

    let query = 'SELECT * FROM temp_regions';
    if (filters.length > 0) {
      query += ` WHERE ${filters.join(' AND ')}`;
    }
    query += ' ORDER BY updated DESC';

    const result = await pool.query(query, values);
    const data = result.rows;

    if (data.length === 0) {
      return res.status(404).json({ message: 'No data found' });
    }

    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', 'attachment; filename=users.pdf');
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);

    doc.fontSize(20).text('Data Users', { align: 'center' });
    doc.moveDown();

    data.forEach((row, index) => {
      doc
        .fontSize(12)
        .text(
          `${index + 1}. Propinsi: ${row.propinsi}, Kecamatan: ${
            row.kecamatan
          }, Kelurahan: ${row.kelurahan}, Nama: ${row.nama}`
        );
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
