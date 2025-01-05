const path = require('path');
const express = require('express');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();

const uploadPath = path.join(__dirname, 'uploads');


if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log('Uploads directory created:', uploadPath);
} else {
  console.log('Uploads directory exists:', uploadPath);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});


const fileFilter = (req, file, cb) => {
  const filetypes = /\.pdf$/;
  const mimetypes = /application\/pdf/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('PDF files only'), false);
  }
};

console.log(uploadPath);

const upload = multer({ storage, fileFilter });
const uploadSinglePdf = upload.single('pdf');


router.post('/', (req, res) => {
  uploadSinglePdf(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      console.log('File saved at:', req.file.path);
      res.status(200).send({
        message: 'PDF uploaded successfully',
        file: `/uploads/${path.basename(req.file.path)}`,
      });
    } else {
      res.status(400).send({ message: 'No PDF file provided' });
    }
  });
});

module.exports = { uploadRoutes: router };
