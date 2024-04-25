import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
});

const multerMiddleware = multer({
  storage: storage,
  limits: { fileSize: 1000 * 102400 },
});
export default multerMiddleware;
