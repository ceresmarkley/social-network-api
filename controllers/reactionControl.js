const { Thought } = require('../models');

module.exports = {

    // UPDATE a thought with a reaction
    async addReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (!thoughtData) {
                return res.status(404).json({ message: 'Oops! Could not find thought with this ID' });
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // DELETE one reaction from a thought
    async deleteReaction(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            if (!thoughtData) {
                return res.status(404).json({ message: 'Oops! Could not find thought with this ID' });
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
}