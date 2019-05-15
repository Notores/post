const {NotoresModule} = require('@notores/core');
class PostModule extends NotoresModule {
    
    constructor(){
        super();

        const Post = require('./model');
        this.setModel(Post.modelName, Post);
        Post.loadModel();
    }

    init(){
        require('./routes')();
    }
}

module.exports = new PostModule();
