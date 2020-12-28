const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comments');

Post.belongsTo(User, {
	foreignKey: 'UserId',
	onDelete: 'CASCADE',
});

Post.hasMany(Comment, {
	foreignKey: 'postId',
	onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
	foreignKey: 'UserId',
	onDelete: 'CASCADE',
});

module.exports = {
	User,
	Comment,
	Post,
};
