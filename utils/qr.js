const fs = require("fs");
const path = require("path");
const qrcode = require("qrcode");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function saveQRCode(data, filename) {
  const outputDir = path.join(__dirname, "..", "wallets");
  ensureDir(outputDir);

  const filePath = path.join(outputDir, `${filename}.png`);

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
