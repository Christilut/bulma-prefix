module.exports = {
    plugins: [
        require('autoprefixer'),
        require('./ext_vendor/postcss-class-prefix')('custom-prefix-')
    ]
}