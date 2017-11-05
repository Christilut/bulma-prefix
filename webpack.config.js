/**
 * Mighty Maxx Webpack Configuration File
 */
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const inProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        bulma: [
            './node_modules/bulma/bulma.sass',
        ]
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                //SASS Rules
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader' , 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                //Javascript Rules
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },

            {
                // Images Rules
                test: /\.(png|jpe?g|gif)$/,

                loader: 'file-loader',

                options: {

                    name: 'images/[name].[ext]'

                }

            },

            {
                // Fonts Rules
                test: /\.(svg|eot|ttf|woff|woff2)$/,

                loader: 'file-loader',

                options: {

                    name: 'fonts/[name].[ext]'

                }

            }
        ],
    },

    plugins: [
        new CleanWebpackPlugin(['assets'],{
            root:     __dirname,
            verbose:  true,
            dry:      false
        }),

        new ExtractTextPlugin('[name].css'),

        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        }),
    ]
};

if(inProduction){

    module.exports.plugins.push(

        new webpack.optimize.UglifyJsPlugin()

    );

}