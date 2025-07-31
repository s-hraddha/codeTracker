const mongoose = require('mongoose');
const { Schema } = mongoose;
const platformDataSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    leetcode: {
        type: Schema.Types.Mixed,//This will make it completely flexible to store whatever the platform APIs return.
        default: {}
    },

    codeforces: {
        type: Schema.Types.Mixed,
        default: {}
    },

    gfg: {
        type: Schema.Types.Mixed,
        default: {}
    },
    hackerrank: {
        type: Schema.Types.Mixed,
        default: {}
    },
    codechef: {
        type: Schema.Types.Mixed,
        default: {}
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('platformData', platformDataSchema);