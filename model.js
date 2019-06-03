const {stringToUrl} = require("./lib/stringExtend");
const {MongoSchema} = require('@notores/core');

const Post = new MongoSchema('Post', {
        title: {type: String, required: true, unique: true},
        url: {type: String, required: true, unique: true},
        content: {type: String, required: true},
        headerImage: {type: String, required: false},
        tags: [{type: String}],
        // author: {type: Schema.Types.ObjectId, ref: 'User'},
        // authorLastEdit: {type: Schema.Types.ObjectId, ref: 'User'},    // ObjectId
        page: {type: Boolean, required: true, default: false},
        // likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
        live: {type: Boolean, required: true, default: false},
        history: [{type: MongoSchema.Types.Mixed}],
        allowComments: {type: Boolean, default: false},
        // comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    },
    {
        minimize: false,
        timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}
    }
);

Post.pre('validate', function fixTitleUrl(next) {
    if (!this.url)
        this.url = stringToUrl(this.title);

    // this.dateLastEdited = Date.now();

    next();
});

Post.updateWhitelist('get', [
    'title',
    'url',
    'page',
    'content',
    'headerImage',
    'tags',
    'allowComments'
]);

module.exports = Post;

