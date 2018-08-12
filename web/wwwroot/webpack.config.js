const path = require('path');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let Webpack = require("webpack");
let cssExtractor = new ExtractTextPlugin('style.css', { allChunk: true })

module.exports = {
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
                    }
                }
            },
            {
                test: /\.css$/,
                loaders: cssExtractor.extract({fallback: "style-loader", use: [
                    "css-loader", 
                    "resolve-url-loader"
                ]})
            },
            {
                test: /\.scss$/,
                use: cssExtractor.extract({fallback: "style-loader", use: [
                    "css-loader", 
                    "resolve-url-loader", 
                    {
                        loader: "sass-loader?sourceMap",
                        options: {
                            includePaths: [path.resolve(__dirname, 'images'), path.resolve(__dirname, 'dist')]
                        }
                    }
                ]})
            },
            {
                test: /\.woff2?$|\.ttf$|\.otf$|\.eot$|\.svg$|\.png|\.jpe?g|\.gif$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                    },
                },
            }
        ]
    },
    plugins: [
        cssExtractor,
        new UglifyJSPlugin(),
        new Webpack.ProvidePlugin({
            Vue: "vue/dist/vue.min.js",
            $: "jquery/dist/jquery.min.js",
            jQuery: "jquery/dist/jquery.min.js",
            "window.jQuery": "jquery/dist/jquery.min.js",
        })
    ]
};