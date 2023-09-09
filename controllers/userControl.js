const { User, Thought } = require('../models');

module.exports = {
    // GET all users
    async allUsers(req, res) {
        try {
            const userData = await User.find()
            // explicitly exclude version key
            .select('-__v')
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // GET one user by ID
    async getUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userID })
            .select('-__v')
            // access subdocs 'thoughts' and 'friends'
            .populate('thoughts')
            .populate('friends')
            // check to find if user exists
            if (!userData) {
                return res.status(404).json({ message: 'Oops! Could not recognize or find this user!'})
            }
            res.json(thoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
}