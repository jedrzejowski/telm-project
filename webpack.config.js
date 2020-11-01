const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

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
                loader: "ts-loader",
                options: {
                    instance: "frontend",
                    context: path.join(__dirname, "src/frontend"),
                }
            },
            exclude: /node_modules/,
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
    ]
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
                loader: "ts-loader",
                options: {
                    instance: "backend",
                    context: path.join(__dirname, "src/backend"),
                }
            },
            exclude: /node_modules/,
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

module.exports = [client_config, backend_config];
