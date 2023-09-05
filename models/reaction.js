const { Schema, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },

        reactionBody: {
            type: Date,
            default: Date.now,
            get: (timestamp) => {
                return moment(timestamp).format('MM-DD-YYYY, dddd, HH:mm:ss');
            }
        },

        username: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => {
                // use moment to set time format
                return moment(timestamp).format('MM-DD-YYYY, dddd, HH:mm:ss');
            }
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;