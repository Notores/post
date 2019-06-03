const {NotoresModule} = require('@notores/core');
class PostModule extends NotoresModule {

    init(){
        super.init();

        const Post = require('./model');

        this.setModel(Post.modelName, Post);
        Post.loadModel();

        require('./routes');
    }
}

module.exports = new PostModule();
