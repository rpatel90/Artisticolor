const path = require('path');
const FBROOT = "/src/js/init-fb";

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    /**
    * ALL BUNDLES WILL HAVE FBROOT BUNDLED
    */

    mode: 'development',

    devServer: {
        static: 'dist',
        client: { logging: 'error' },
        compress: true,
        port: 8000
    },
    
    resolve: {
        alias: {
            styles: path.resolve(__dirname, 'src/assets/styles')
        }
    },

    entry: {
        index: ["/src/js/index", "/src/js/login", "/src/js/listener"],
        profile: ["/src/js/profile", "/src/js/login", "/src/js/listener"],
        projects: ["/src/js/projects", "/src/js/login", "/src/js/listener"],
        register: ["/src/js/register"],
    },
    //Output files to /dist
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },

    module: {
        rules: [{
            test:/\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
            ]
        }]
    },

    plugins: [      
        //Generate HTML pages
        new HTMLWebpackPlugin({
            template: 'src/pages/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html',
        }),
        new HTMLWebpackPlugin({
            template: 'src/pages/profile.html',
            inject: true,
            chunks: ['profile'],
            filename: 'profile.html',
        }),
        new HTMLWebpackPlugin({
            template: 'src/pages/projects.html',
            inject: true,
            chunks: ['projects'],
            filename: 'projects.html',
        }),
        new HTMLWebpackPlugin({
            template: 'src/pages/register.html',
            inject: true,
            chunks: ['register'],
            filename: 'register.html',
        }),
        
        //Generate CSS files
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),

        //Copy images and icons
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets/',
                    globOptions: {
                        ignore: ['**/styles']
                    },
                }
            ]
        }),
    ], 
};
//Add FBROOT to all bundles
for(const key in module.exports.entry) module.exports.entry[key].push(FBROOT);