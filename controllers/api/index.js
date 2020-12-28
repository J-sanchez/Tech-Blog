const router = require('express').Router();

const UserRoutes = require('./User-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

router.use('/Users', UserRoutes);
router.use('/Posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
