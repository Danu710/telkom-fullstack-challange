import pool from '../config/db.js';
import PDFDocument from 'pdfkit';
import { format } from 'fast-csv';

export const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const searchQuery = req.query.q ? `%${req.query.q}%` : '%';

    // Get total count of records
    const countResult = await pool.query(
      'SELECT COUNT(*) FROM temp_regions WHERE nama ILIKE $1',
      [searchQuery]
    );
    const totalRecords = parseInt(countResult.rows[0].count);

    // Fetch data with pagination
    const result = await pool.query(
      'SELECT * FROM temp_regions WHERE nama ILIKE $1 ORDER BY updated DESC LIMIT $2 OFFSET $3',
      [searchQuery, limit, offset]
    );

    // Structure response
    res.json({
      success: true,
      message: 'Data retrieved successfully',
      pagination: {
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
        currentPage: page,
        limit: limit,
      },
      data: result.rows, // Return the fetched data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRegions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const { propinsi, kab_kota, kecamatan, kelurahan, nama } = req.query;

    let filters = [];
    let values = [];
    let index = 1;

    if (propinsi) {
      filters.push(`propinsi ILIKE $${index}`);
      values.push(`%${propinsi}%`);
      index++;
    }
    if (kab_kota) {
      filters.push(`kab_kota ILIKE $${index}`);
      values.push(`%${kab_kota}%`);
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

    // Query total count (tanpa limit & offset)
    const countResult = await pool.query(
      countQuery,
      values.slice(0, index - 1)
    );
    const totalRecords = parseInt(countResult.rows[0].count);

    // Query data
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
    const { propinsi, kab_kota, kecamatan, kelurahan, nama } = req.query;

    let filters = [];
    let values = [];
    let index = 1;

    if (propinsi) {
      filters.push(`propinsi ILIKE $${index}`);
      values.push(`%${propinsi}%`);
      index++;
    }
    if (kab_kota) {
      filters.push(`kab_kota ILIKE $${index}`);
      values.push(`%${kab_kota}%`);
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

    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    res.setHeader('Content-Disposition', 'attachment; filename=regions.pdf');
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);

    // Judul Dokumen
    doc.fontSize(16).text('Daftar Wilayah', { align: 'center' }).moveDown(2);

    // Header tabel
    const startX = 50;
    let startY = 100;
    const columnWidths = [40, 100, 100, 100, 100, 100];

    // Gambar header tabel
    doc.font('Helvetica-Bold').fontSize(12);
    doc.rect(startX, startY, 540, 25).fill('#cccccc').stroke();
    doc
      .fillColor('black')
      .text('No', startX + 5, startY + 5)
      .text('Propinsi', startX + columnWidths[0] + 5, startY + 5)
      .text(
        'Kab/Kota',
        startX + columnWidths[0] + columnWidths[1] + 5,
        startY + 5
      )
      .text(
        'Kecamatan',
        startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + 5,
        startY + 5
      )
      .text(
        'Kelurahan',
        startX +
          columnWidths[0] +
          columnWidths[1] +
          columnWidths[2] +
          columnWidths[3] +
          5,
        startY + 5
      )
      .text(
        'Nama',
        startX +
          columnWidths[0] +
          columnWidths[1] +
          columnWidths[2] +
          columnWidths[3] +
          columnWidths[4] +
          5,
        startY + 5
      );

    startY += 25;

    // Isi tabel
    doc.font('Helvetica').fontSize(10);
    data.forEach((row, index) => {
      doc.rect(startX, startY, 540, 25).stroke();

      doc
        .text(index + 1, startX + 5, startY + 5)
        .text(row.propinsi, startX + columnWidths[0] + 5, startY + 5)
        .text(
          row.kab_kota,
          startX + columnWidths[0] + columnWidths[1] + 5,
          startY + 5
        )
        .text(
          row.kecamatan,
          startX + columnWidths[0] + columnWidths[1] + columnWidths[2] + 5,
          startY + 5
        )
        .text(
          row.kelurahan,
          startX +
            columnWidths[0] +
            columnWidths[1] +
            columnWidths[2] +
            columnWidths[3] +
            5,
          startY + 5
        )
        .text(
          row.nama,
          startX +
            columnWidths[0] +
            columnWidths[1] +
            columnWidths[2] +
            columnWidths[3] +
            columnWidths[4] +
            5,
          startY + 5
        );

      startY += 25;
    });

    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const exportRegionsToCsv = async (req, res) => {
  try {
    const { propinsi, kab_kota, kecamatan, kelurahan, nama } = req.query;

    let filters = [];
    let values = [];
    let index = 1;

    if (propinsi) {
      filters.push(`propinsi ILIKE $${index}`);
      values.push(`%${propinsi}%`);
      index++;
    }
    if (kab_kota) {
      filters.push(`kab_kota ILIKE $${index}`);
      values.push(`%${kab_kota}%`);
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

    res.setHeader('Content-Disposition', 'attachment; filename=regions.csv');
    res.setHeader('Content-Type', 'text/csv');

    const csvStream = format({ headers: true });
    csvStream.pipe(res);

    data.forEach((row) => csvStream.write(row));
    csvStream.end();
  } catch (error) {
    console.error('Error generating CSV:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
