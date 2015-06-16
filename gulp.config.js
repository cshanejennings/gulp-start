module.exports = function () {
    var client = './src/client/';
    var config = {
        temp: './tmp/',
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        less: {
            files: [
                client + 'styles/styles.less'
            ],
            prefixer: {
                browsers: [
                    'last 2 version',
                    '> 5%'
                ]
            }
        }
    };
    return config;
};
