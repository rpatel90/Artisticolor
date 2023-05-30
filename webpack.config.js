const path = require('path');
const { readdirSync: readdir } = require('fs')

//Plugins
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {

    mode: 'development',

    resolve: { alias: {
        js: path.resolve(__dirname, 'src/js'),
        styles: path.resolve(__dirname, 'src/assets/styles'),
        utils: path.resolve(__dirname, 'src/utils'),
        lib: path.resolve(__dirname, 'src/lib'),
        anim: path.resolve(__dirname, 'src/utils/anim'),
        error: path.resolve(__dirname, 'src/utils/anim/error'),
        firebasedb: path.resolve(__dirname, 'src/utils/firebase')
    }},

    entry: {
        index: ['./src/js/index', './src/js/login', './src/js/init'],
        profile: ['./src/js/profile', './src/js/login', './src/js/init'],
        projects: ['./src/js/projects', './src/js/login', './src/js/init'],
        register: ['./src/js/register'],
    },
    //Output files to a dist folder
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },

    module: { rules: [{
        test:/\.s[ac]ss$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
        ]
    }]},

    plugins: [
        //Add HTML files
        ...readdir('src/pages').map(file => file.split('.')[0]).map(file => new HTMLPlugin({
            template: `src/pages/${file}.html`,
            inject: true,
            chunks: [file],
            filename: `${file}.html`,
        })),
        //Generate CSS files
        new MiniCssExtractPlugin({ filename: '[name].css' }),
        //Copy images and icons
        new CopyPlugin({
            patterns: [{
                from: 'src/assets/',
                globOptions: {
                    ignore: ['**/styles']
                },
            },
            {
                from: 'src/lib'
            }]
        }),
    ],
};