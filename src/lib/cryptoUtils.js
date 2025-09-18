// src/lib/cryptoUtils.js
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

// ------------------------------------------------------------------
// 🔹 Load RSA keys
// ------------------------------------------------------------------
// Bank’s PUBLIC key (to encrypt AES key when sending request)
const publicKeyPath = path.join(__dirname, "../../config/hdbfs-public.pem");
const bankPublicKey = fs.readFileSync(publicKeyPath, "utf8");

// Your PRIVATE key (to decrypt AES key from bank response)
const privateKeyPath = path.join(__dirname, "../../config/my-private.pem");
const myPrivateKey = fs.readFileSync(privateKeyPath, "utf8");

// ------------------------------------------------------------------
// 🔹 Key/IV Generators
// ------------------------------------------------------------------
function generateSymmetricKey() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateIV() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ------------------------------------------------------------------
// 🔹 AES Encrypt: (IV + Payload) → base64
// ------------------------------------------------------------------
function encryptPayload(payload, symmetricKey, iv) {
  const keyBuffer = Buffer.from(symmetricKey, "utf8");
  const ivBuffer = Buffer.from(iv, "utf8");

  const cipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, ivBuffer);
  let encrypted = cipher.update(payload, "utf8", "base64");
  encrypted += cipher.final("base64");

  return {
    iv: ivBuffer.toString("base64"),
    encryptedData: encrypted
  };
}

// ------------------------------------------------------------------
// 🔹 AES Decrypt: base64 → (IV + Payload)
// ------------------------------------------------------------------

function decryptPayload(encryptedData, symmetricKey, ivBase64) {
  const keyBuffer = Buffer.from(symmetricKey, "utf8");
  const ivBuffer = Buffer.from(ivBase64, "base64");

  const decipher = crypto.createDecipheriv("aes-256-cbc", keyBuffer, ivBuffer);
  let decrypted = decipher.update(encryptedData, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

// ------------------------------------------------------------------
// 🔹 RSA Encrypt Symmetric Key with Bank’s Public Key
// ------------------------------------------------------------------
function encryptSymmetricKey(symmetricKey) {
  const buffer = Buffer.from(symmetricKey, "utf8");
  const encrypted = crypto.publicEncrypt(
    {
      key: bankPublicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    buffer
  );
  return encrypted.toString("base64");
}

// ------------------------------------------------------------------
// 🔹 RSA Decrypt Symmetric Key with Our Private Key
// ------------------------------------------------------------------
function decryptSymmetricKey(encryptedKeyBase64) {
  const buffer = Buffer.from(encryptedKeyBase64, "base64");
  const decrypted = crypto.privateDecrypt(
    {
      key: myPrivateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    buffer
  );
  return decrypted.toString("utf8");
}

module.exports = {
  generateSymmetricKey,
  generateIV,
  encryptPayload,
  decryptPayload,
  encryptSymmetricKey,
  decryptSymmetricKey,
};
