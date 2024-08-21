const Schema = require('mongoose').Schema;

const BaseSchema = new Schema({
    createdAt: {
        type: Date,
        default: new Date()     // current date if no date is inserted in the creation time,
    },
    updatedAt: {
        type: Date,
        default: null
    },
    updatedBy: {
        type: String,            // to put reference of the user update this model
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    },
    deletedBy: {
        type: String,           // to put reference of the user responsible for deleting it
        default: null
    }
})

module.exports = BaseSchema