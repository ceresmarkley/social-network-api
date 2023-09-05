const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');
const moment = require('moment');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },

        createdAt: {
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

        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema
    .virtual('reactionCount').get(function (){
        return this.reactions.length;
    });

const thought = model('thought', thoughtSchema);

module.exports = thought;