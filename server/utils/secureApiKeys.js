import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SECRET_KEY || "your-secret-key"; // You should store this securely, like in environment variables.

// Encrypt function
export const encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

// Decrypt function
export const decrypt = (cipherText) => {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};
