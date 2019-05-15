const logger = require('@notores/core/logger')(module);
const {stringToUrl} = require("./lib/stringExtend");

class PostRouter {

    static getModel() {
        return require('./model').model;
    }

    static getModelWrapper() {
        return require('./model');
    }

    static async get(req, res, next) {
        next('route');
    }

    static async getAdmin(req, res, next) {
        next('route');
    }

    static async getById(req, res, next) {
        next('route');
    }

    static async getByPostUrl(req, res, next) {
        try {
            const Wrapper = PostRouter.getModelWrapper();
            const Post = Wrapper.model;

            const result = await Post
                .findOne({live: true, url: req.params.postUrl.toLowerCase()})
                .select(Wrapper.whitelist.get)
                .populate('relatedPosts')
                .exec();

            if (!result)
                return next('route');

            res.locals.themePage = result.page ? 'page' : 'post';
            res.locals.setBody(result.page ? {page: result} : {post: result});

            return next();
        } catch (e) {
            res.locals.setBody({post: e});
        }

        next('route');
    }

    static async post(req, res, next) {

        next('router');
    }

    static async patch(req, res, next) {

        next('router');
    }

    static async delete(req, res, next) {
        const Post = PostRouter.getModel();

        const result = await Post.deleteOne({_id: req.params.postId}).exec();

        res.locals.setBody({post: result});
        next('router');
    }

}

module.exports = PostRouter;
