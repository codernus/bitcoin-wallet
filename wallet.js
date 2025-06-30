const bitcoin = require("bitcoinjs-lib");
const bip39 = require("bip39");
const BIP32Factory = require("bip32").default || require("bip32");
const ecc = require("tiny-secp256k1");

bitcoin.initEccLib(ecc);
const bip32 = BIP32Factory(ecc);

const mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);
const root = bip32.fromSeed(seed);

const path = "m/84'/0'/0'/0/0";
const child = root.derivePath(path);

const { address } = bitcoin.payments.p2wpkh({
  pubkey: Buffer.from(child.publicKey),
});
const wif = child.toWIF();

console.log("Mnemonic:", mnemonic);
console.log("Bech32 Address:", address);
console.log("Private Key (WIF):", wif);
