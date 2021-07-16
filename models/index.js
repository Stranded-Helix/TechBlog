const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

User.hasMany(Post, {
    onDelete: 'CASCADE'
});

Post.belongsTo(User);

User.hasMany(Comment, {
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    onDelete: 'CASCADE'
})

Comment.belongsTo(User)

Comment.belongsTo(Post)

module.exports = {
    User,
    Post,
    Comment
}