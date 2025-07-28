const multer = require("multer");
const path = require("path");

// Configuration de stockage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/")); // dossier uploads/ à la racine du backend
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtres pour n’accepter que des fichiers images ou PDF (optionnel)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Type de fichier non autorisé."), false);
  }
};

// Middleware multer
const upload = multer({ storage, fileFilter });

module.exports = upload;
