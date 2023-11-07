const path = require("path");
const multer = require("multer");
const dayFns = require("date-fns");

const halfMb = 500000;

const storage = multer.diskStorage({
    destination: path.join(__dirname, "..", "uploads"),
    filename(req, file, cb) {
        const date = dayFns.format(new Date(), "ddMMyyyy-HHmmss");
        cb(null, `${date}-${file.originalname}`);
    },
});

const fileFilter = function (req, file, cb) {
    const allowedFiles = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedFiles.includes(file.mimetype)) {
        return cb(new Error("File format qo'lllab quvvatlanmaydi."));
    }

    cb(null, true);
};

const limits = {
    fieldNameSize: 255,
    fileSize: halfMb,
};

const upload = multer({
    storage,
    fileFilter,
    limits,
});

module.exports = upload;
