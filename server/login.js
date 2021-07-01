const crypt = require('./encryptUtil.js');
const Token = require('./tokenUser.js');
const schema = require('./userSchema.js');
const express = require('express')

var login = express.Router()



login.post("/login", function(req, res){
    console.log(req.body)
        schema.findOne({ email: req.body.email }, { email: 1, name: 1, password: 1, role: 1 },
            function (err, doc) {
                if (err) {
                    res.status(500).send()
                }
                if (!req.body.email || !crypt.compare(req.body.password, doc.password)) {
                    res.status(401).send({ msg: "email or password not exists" })
                }
                var token = new Token(true, null, doc.name, doc.permission, doc._id)
                res.status(200).send({ token: token.token, name: doc.name, permission: doc.permission });
            })
})



module.exports = login;