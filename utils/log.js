const fs = require("fs");
const path = require("path");

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function logWallet({ address, wif, mnemonic }) {
  const logsDir = path.join(__dirname, "..", "logs");
  ensureDir(logsDir);

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filename = `wallet_${timestamp}.json`;
  const filePath = path.join(logsDir, filename);

  const content = {
    created_at: new Date().toISOString(),
    address,
    wif,
    mnemonic,
  };

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  return filePath;
}

module.exports = {
  logWallet,
};
