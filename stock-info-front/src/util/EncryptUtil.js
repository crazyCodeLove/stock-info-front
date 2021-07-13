import cryptoJs from 'crypto-js'

let encryptKey = '1234567812345678'

export default {
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