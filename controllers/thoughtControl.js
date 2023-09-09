const { User, Thought } = require('../models');

module.exports = {
    // GET all thoughts
    async allThoughts(req, res) {
        try {
            const thoughtData = await Thought.find()
            // sorting by descending order will have newest posts appear first. This is perfect for current "feeds" data.
            .sort({ createdAt: -1 })
            .select('-__v');
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // GET one thought using ID
    async getThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');
            if (!thoughtData) {
                return res.status(404).json({ message: 'Oops! Could not find thought with this ID'})
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // CREATE new thought
    async createThought(req, res) {
        try {
            // create thought by first sending the request body.
            const thoughtData = await Thought.create(req.body);
            // after sending request, check the user ID of user and connect to created thought
            const userData = await User.findOneAndUpdate({ _id: req.body.userID },
                // '$ push' operator adds(updates) thought ID into thoughts ID database
                { $push: { thoughts: thoughtData._id }},
                {new: true }
            );
            // checks if user exists
            if (!userData) {
                return res.status(404).json({ message: 'Oops! Could not recognize or find this user!'})
            }
            res.json({ message: 'You shared a NEW Thought!', thought: thoughtData });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // UPDATE a thought by ID
    async updateThought(req, res) {
        try {
            // find thought using its ID
            const thoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId},
                // '$ set' operator used to replace request body.
                { $set: req.body },
                { runValidators: true, new: true });
                if (!thoughtData) {
                    return res.status(404).json({ message: 'Oops! Could not find thought with this ID'})
                }
                res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // DELETE a thought by ID
    async deleteThought(req, res) {
        try {
            // find thought using its ID
            const thoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId});
            // check if thought exists with selected ID
            if (!thoughtData) {
                return res.status(404).json({ message: 'Oops! Could not find thought with this ID'})
            }
            // find user who had deleted thought and remove
            const userData = await User.findOneAndUpdate({ thoughts: req.params.thoughtId },
                // '$ pull' operator removes thought ID from thoughts ID database
                { $pull: { thoughts: req.params.thoughtId }},
                {new: true }
            );

            if (!userData) {
                return res.status(404).json({ message: 'Oops! Could not recognize or find this user!'})
            }

            res.json({ message: 'You forgot(deleted) a thought!'});
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
    },   
}