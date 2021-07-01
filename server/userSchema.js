const mongoose = require("mongoose");
const schema = mongoose.Schema;


var userSchema = new schema({
    ID: {
        type: Number
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    Nickname: {
        type: String
    },
    class: {
        type: String
    },
    role: {
        type: String
    },
    password: {
        type: Number
    },
    incomeDay1: {
        type: Number,
        default: 0
    },
    incomeDay2: {
        type: Number,
        default: 0
    },
    incomeDay3: {
        type: Number,
        default: 0
    },
    incomeDay4: {
        type: Number,
        default: 0
    },
    fine: {
        type: Number,
        default: 0
    },
    jacket: {
        type: Object
    },
    hat: {
        type: Object
    }

});



module.exports = mongoose.model("user", userSchema);