const PostRouter = require('./Router');
const {routeWithHandle, checkEmptyParams} = require('@notores/core');

module.exports = () => {

    routeWithHandle(
        'notores-readProductFromUrl',
        '/:postUrl',
        [
            checkEmptyParams,
            PostRouter.getByPostUrl,
        ],
        {
            accepts: ['html', 'json'],
        },
    );

};
