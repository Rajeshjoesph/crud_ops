const multer=require("multer");

const storage =multer.diskStorage({
    destination:"src/public/images",
    filename:(req, file, cb) =>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const singleUpload = multer({storage});
const upload = singleUpload.single("profile");

module.exports =upload;