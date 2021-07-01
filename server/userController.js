const userSchema = require('./userSchema.js');
const crypt = require('./encryptUtil.js');
const Token = require('./tokenUser.js');



function userController() {


    function create(req, res) {
        console.log(req.body)
        if (!req.body.firstName || !req.body.ID) {
            return res.status(400).send({});
        }
        if (req.body.password) {
            req.body.password = crypt.cryptPassword(req.body.password);
        }
        var newUser = new userSchema(req.body);
        newUser.save(function (err, newDoc) {
            if (err) {
                var msg = "no info";
                if (err.code == 11000) {
                    msg = "user already exsits";
                }
                return res.status(500).send({ msg });
            }
            res.status(201).send(newDoc);
        })
    }


    function update(req, res) {
        console.log(req.body)
        var update = { $set: req.body }
        if (req.body.fine || req.body.fine >-1) {
            let fine = req.body.fine;
            delete req.body.fine;
            update = { $set: req.body, $inc: { fine }}
        }
        console.log(update)
        userSchema.updateOne({ ID: req.params.ID }, update, function (err, user) {
            if (err) {
                return res.status(500).send({ "msg": "db problem" });
            } if (!user) {
                return res.status(404).send("not found");
            }
            res.status(200).send(user)
        })
    }


    function updateIncome(req, res) {
        userSchema.updateOne({ ID: req.params.ID },
            {
                $inc: {
                    incomeDay1: req.body.incomeDay1, incomeDay2: req.body.incomeDay2, incomeDay3: req.body.incomeDay3,
                    incomeDay4: req.body.incomeDay4
                }
            }, function (err, user) {
                if (err) {
                    return res.status(500).send({ "msg": "db problem" });
                } if (!user) {
                    return res.status(404).send("not found");
                }
                res.status(200).send(user)
            })
    }


    function getOne(req, res) {
        userSchema.findOne({ ID: req.params.ID }, {}, function (err, user) {
            if (err) {
                return res.status(500).send({ "msg": "db problem" });
            } if (!user) {
                return res.status(404).send("not found");
            }
            res.status(200).send(user)
        })
    }


    function getNameAndID(req, res) {
        userSchema.findOne({ ID: req.params.ID }, { ID: 1, firstName: 1, lastName: 1, class: 1 }, function (err, user) {
            if (err) {
                return res.status(500).send({ "msg": "db problem" });
            } if (!user) {
                return res.status(404).send("not found");
            }
            res.status(200).send(user)
        })
    }


    function getAll(req, res) {
        userSchema.find(function (err, list) {
            if (err) {
                return res.status(500).send({})
            }
            console.log
            return res.status(200).send(list);
        })
    }


    function totalIncome(req, res) {
        userSchema.aggregate
        userSchema.find({}, { incomeDay1: 1, incomeDay2: 1, incomeDay3: 1, incomeDay4: 1 }, function (err, list) {
            if (err) {
                return res.status(500).send({})
            }
            return res.status(200).send(list);
        })
    }


    return {
        create: create,
        update: update,
        getOne: getOne,
        getAll: getAll,
        totalIncome: totalIncome,
        updateIncome: updateIncome,
        getNameAndID: getNameAndID,

    }
}
module.exports = userController()