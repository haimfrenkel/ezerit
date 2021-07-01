const Encrypt = require("./encryptUtil");
var split = '_!_';
var ttl = 1000 * 60 * 3;


function userToken (isNew, token, name, permission, _id){
    if(isNew){
        this.name = name;
        this._id = _id;
        this.permission = permission;
        this.exporatoinTime = Date.now() + ttl;
        this.token = Encrypt.getEncrypt(
            name + split +
            permission + split+
            _id +split+
            this.exporatoinTime
        );
    } else {
        this.token = token
        var tokenSTR = Encrypt.getDecrypt(token).split(split)
        this.name = tokenSTR[0];
        this._id = tokenSTR[1];
        this.permission = tokenSTR[2];
        this.exporatoinTime = tokenSTR[3]
    }
    this.isNotExpired = function (){
        if(this.exporatoinTime && parseInt(this.exporatoinTime) > Date.now()){
            return true
        }
        return false
    }
}

module.exports = userToken;