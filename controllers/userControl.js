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
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // CREATE a new user
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500),json(err);
        }
    },

    // UPDATE a user by ID
    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate({ _id: req.params.userID},
                { $set: req.body },
                // verify that the updated infomation matches User model format and return the new user instead of the old(original).
                { runValidators: true, new:true });

                if (!userData) {
                    return res.status(404).json({ message: 'Oops! Could not recognize or find this user!'})
                }
                res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500),json(err);
        }
    },

    // DELETE a user by ID
    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete({ _id: req.params.userID});
            if (!userData) {
                return res.status(404).json({ message: 'Oops! Could not recognize or find this user!'})
            }
            // adding function to delete user's thoughts before deleting user.
            await Thought.deleteMany(
                { _id: { $in: userData.thoughts }}
            )
            res.json({ message: 'Deleted User!'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // UPDATE user by ADDING a friend
    async addFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate({ _id: req.params.userID },
                // '$ addToSet' will verify if you have the friend already. If they are not your friend yet then they will be added to friend array.
                { $addToSet: {friends: req.params.friendId }},
                { new:true });

                if (!userData) {
                    return res.status(404).json({ message: 'Oops! Could not recognize or find this user!'})
                }
                res.json(userData);
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
    },

    // UPDATE user by REMOVING a friend
    async deleteFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate({ _id: req.params.userID },
                // '$ pull' operator removes friend using friendId
                { $pull: {friends: req.params.friendId }},
                { new:true });

                if (!userData) {
                    return res.status(404).json({ message: 'Oops! Could not recognize or find this user!'})
                }
                res.json(userData);
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
    },
}
