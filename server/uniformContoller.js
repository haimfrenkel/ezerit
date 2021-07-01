const uniformSchema = require('./uniformSchema.js');
const userSchema = require('./uniformSchema.js');


function uniformController() {

    function create(req, res) {
        console.log(req.body)
       
        var newUniform = new uniformSchema(req.body);
        newUniform.save(function (err, newDoc) {
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


    function getAll(req, res) {
        uniformSchema.find(function (err, list) {
            if (err) {
                return res.status(500).send({})
            }
            return res.status(200).send(list);
        })
    }

    function getAvailableUniforms(req, res){
        userSchema.find({type: req.params.type, available:true }, {}, function (err, user) {
            if (err) {
                return res.status(500).send({ "msg": "db problem" });
            } if (!user) {
                return res.status(404).send("not found");
            }
            res.status(200).send(user)
        })
    }
    

    function update(req, res) {
        userSchema.updateOne({ ID: req.params.ID }, { $set: req.body }, function (err, user) {
            if (err) {
                return res.status(500).send({ "msg": "db problem" });
            } if (!user) {
                return res.status(404).send("not found");
            }
            res.status(200).send(user)
        })
    }


    function getOne(req, res) {
        uniformSchema.findOne({ ID: req.params.ID }, {}, function (err, user) {
            if (err) {
                return res.status(500).send({ "msg": "db problem" });
            } if (!user) {
                return res.status(404).send("not found");
            }
            res.status(200).send(user)
        })
    }


    function getObj(req, res) {
        uniformSchema.findOne({ ID: req.params.ID }, {ID: 1, size: 1, status: 1, type: 1}, function (err, user) {
            if (err) {
                return res.status(500).send({ "msg": "db problem" });
            } if (!user) {
                return res.status(404).send("not found");
            }
            res.status(200).send(user)
        })
    }



    return {
        create: create,
        getAll: getAll,
        getAvailableUniforms: getAvailableUniforms,
        update: update,
        getOne: getOne,
        getObj: getObj
    }
}
module.exports = uniformController()