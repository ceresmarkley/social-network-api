const router = require('express').Router();

// import user and friend controller functions to connect to routes
const {
    allUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userControl');

// /api/users
router.route('/').get(allUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;