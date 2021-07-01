const mongoose = require("mongoose");
const schema = mongoose.Schema;


var uniformSchema = new schema({
    ID: {
        type: Number
    },
    type: {
        type: String
    },
    size: {
        type: String
    },
    status: {
        type: String
    },
    available: {
        type: Boolean
    },
    FoundBy: {
        type: Object
    }
})

module.exports = mongoose.model("uniform", uniformSchema);