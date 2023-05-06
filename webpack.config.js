const path = require('path');
const FBROOT = "/src/js/init-fb";

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    /**
    * ALL BUNDLES WILL HAVE FBROOT BUNDLED
    */

    mode: 'development',

    devServer: {
        static: {
            directory: __dirname
        },
        client: { logging: 'error' },
        compress: true,
        port: 8000
    },
    
    //Bundles
    entry: {
        index: ["/src/js/index", "/src/js/login", "/src/js/listener"],
        profile: ["/src/js/profile", "/src/js/login", "/src/js/listener"],
        projects: ["/src/js/projects", "/src/js/login", "/src/js/listener"],
        register: ["/src/js/register"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },

    module: {
        rules: [
            {
                test:/\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            }
        ]
    },    

    //Html generators
    plugins: [      
        //Generate HTML pages
        new HTMLWebpackPlugin({
            template: './html/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html',
        }),
        new HTMLWebpackPlugin({
            template: './html/profile.html',
            inject: true,
            chunks: ['profile'],
            filename: 'profile.html',
        }),
        new HTMLWebpackPlugin({
            template: './html/projects.html',
            inject: true,
            chunks: ['projects'],
            filename: 'projects.html',
        }),
        new HTMLWebpackPlugin({
            template: './html/register.html',
            inject: true,
            chunks: ['register'],
            filename: 'register.html',
        }),
        
        //Add CSS to HTML pages
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
    ], 
};
//Add FBROOT to all bundles
for(const key in module.exports.entry) module.exports.entry[key].push(FBROOT);