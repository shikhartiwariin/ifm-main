import multer from 'multer'
import path from 'path'
import dotenv from 'dotenv'


dotenv.config()
const storageLocation = process.env.IMAGE_STORAGE_LOCATION || 'EBS'
const memstorage = multer.memoryStorage()

const diskstorage = multer.diskStorage({
  destination(req, file, cb) {
    const subfolder = req.params.subfolder||"100_100"
    cb(null, `uploads/${subfolder}/`)
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`)

    // cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  },
})

const multerUploadsDiskStorage = multer({
  storage: diskstorage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
}).single('image')

const multerUploadsMemStorage = multer({
  storage: memstorage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
}).single('image')

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

//Add here when we Add AMAZON S3 Also.
const multerHanlder = async (req, res, next) => {
  if (storageLocation === 'EBS') {
    multerUploadsDiskStorage(req, res, next)
  } else {
    multerUploadsMemStorage(req, res, next)
  }
}

export {multerHanlder }

