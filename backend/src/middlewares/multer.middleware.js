import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const multerMiddleware = multer({
  storage: storage,
  limits: { fileSize: 1000 * 102400 },
});
export default multerMiddleware;
