import cryptoJs from 'crypto-js';


let smEncrypt = require('sm-crypto').sm2;
let encryptKey = '1234567812345678'
let sm2PublicKey = "04c40e00621656275814fbaf1e88f08c6918a70054966c9f1f893abb9e195a94b799cdad51298fb2375138ee8f40dfdff8064996075bc5cd020c7ccbf1c68985d0"

export default {
    // smEncrypt 加密
    sm2Encrypt(word, cipherMode, publicKey) {
        // cipherMode: 1 - C1C3C2，0 - C1C2C3，默认为1
        if (!publicKey) {
            publicKey = sm2PublicKey;
        }
        if (!cipherMode) {
            cipherMode = 1;
        }
        let encryptData = '04' + smEncrypt.doEncrypt(word, publicKey, cipherMode); // 加密结果
        return encryptData;
    },
    // 加密函數
    aesEncrypt(word) {
        let key = cryptoJs.enc.Utf8.parse(encryptKey);
        let enc = ''
        if (typeof word === 'string') {
            enc = cryptoJs.AES.encrypt(word, key, {
                // iv: iv
                mode: cryptoJs.mode.ECB,
                padding: cryptoJs.pad.Pkcs7
            })
        } else if (typeof word === 'object') {
            let data = JSON.stringify(word)
            enc = cryptoJs.AES.encrypt(data, key, {
                // iv: iv
                mode: cryptoJs.mode.ECB,
                padding: cryptoJs.pad.Pkcs7
            })
        }
        let encResult = enc.ciphertext.toString()
        return encResult
    },
    // 解密函數
    aesDecrypt(word) {
        let key = cryptoJs.enc.Utf8.parse(encryptKey);
        let dec = cryptoJs.AES.decrypt(cryptoJs.format.Hex.parse(word), key, {
            mode: cryptoJs.mode.ECB,
            padding: cryptoJs.pad.Pkcs7
        })
        let decData = cryptoJs.enc.Utf8.stringify(dec)
        return decData
    },

    // sha256 加密
    sha256(word) {
        return cryptoJs.SHA256(word).toString();
    },

    // md5 加密
    md5(word) {
        return cryptoJs.MD5(word).toString();
    }
}