const router = require('express').Router();

// import thought and reaction controller functions to connect to routes
const {
    allThoughts,
    getThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtControl');

const {
    addReaction,
    deleteReaction,
} = require('../../controllers/reactionControl')


// /api/thoughts routes
router.route('/').get(allThoughts).post(createThought);

// /api/thoughts/:thoughtId routes
router.route('/:thoughtId').get(getThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions 
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;