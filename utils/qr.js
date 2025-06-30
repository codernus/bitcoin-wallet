const fs = require("fs");
const path = require("path");
const qrcode = require("qrcode");

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function saveQRCode(data, filename) {
  const imagesDir = path.join(__dirname, "..", "images");
  ensureDir(imagesDir);
  const filePath = path.join(imagesDir, `${filename}.png`);
  await qrcode.toFile(filePath, data, {
    errorCorrectionLevel: "H",
    type: "png",
    width: 400,
  });
  return filePath;
}

module.exports = {
  saveQRCode,
};
