const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");

const is_production = process.env.NODE_ENV === 'production';

const client_config = {
    target: "web",
    entry: {
        main: "./src/frontend/index.tsx"
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist/public/")
    },
    module: {
        rules: [{
            test: /\.(ts|tsx)$/,
            use: {
                loader: "ts-loader"
            },
            exclude: /(node_modules|src\/backend)/,
        }]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Systemy telemedyczne",
            filename: "index.html",
            template: "./src/frontend/index.ejs",
            chunks: ["main"],
        }),
        new webpack.DefinePlugin({
            IS_PRODUCTION: JSON.stringify(is_production),
            IS_DEVELOPMENT: JSON.stringify(!is_production),
        }),
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    priority: 0,
                    test: /\/node_modules\//,
                    name: "vendor"
                },
                react: {
                    priority: 9,
                    test: /\/node_modules\/(react|final-form)/,
                    name: "react"
                },
                "react-admin": {
                    priority: 8,
                    test: /\/node_modules\/ra-/,
                    name: "react-admin",
                },
                "material-ui": {
                    priority: 7,
                    test: /\/node_modules\/@material-ui/,
                    name: "material-ui",
                },
                "rechart": {
                    priority: 6,
                    test: /\/node_modules\/rechart/,
                    name: "rechart",
                },
            },
        },
    },
};

const backend_config = {
    target: "node",
    entry: {
        main: "./src/backend/index.ts"
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist/private/")
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: {
                loader: "ts-loader"
            },
            exclude: /(node_modules|src\/frontend)/,
        }]
    },
    resolve: {
        extensions: [".ts", ".js", ".json"],
    },
    externals: [
        nodeExternals()
    ],
    plugins: [
        new webpack.DefinePlugin({
            IS_PRODUCTION: JSON.stringify(is_production),
            IS_DEVELOPMENT: JSON.stringify(!is_production),
        }),
    ]
};


module.exports = () => [client_config, backend_config];
