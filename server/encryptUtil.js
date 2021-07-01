var Crypto = require("crypto-js");
const bcrypt = require("bcrypt");

const key = "adflskjljklkasjdfklvnklayujnalkjdcnlkasuhfykjncv";

function crypto() {


    function cryptPassword(password) {
        return bcrypt.hashSync(password, 10)
    }


    function compare(password1, password) {
        return bcrypt.compareSync(password1, password);
    }


    function getEncrypt(input){
        const enc = Crypto.AES.encrypt(input, key);
        return enc.toString();
    }

    function getDecrypt(input){
        const dec = Crypto.AES.decrypt(input, key);
        return dec.toString(Crypto.enc.Utf8)
    }
    
    return {
        cryptPassword: cryptPassword,
        compare: compare,
        getDecrypt: getDecrypt,
        getEncrypt: getEncrypt
    }
}
module.exports = crypto()