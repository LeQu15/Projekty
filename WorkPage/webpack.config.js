var path = require('path');

module.exports = {
    entry: ["./modules/animation.jsx", "./modules/main.jsx", "./modules/weather.jsx"],
    output: {
        filename: "out.js",
        path: path.resolve(__dirname, 'js')
    },
    mode: 'development',
    watch: true,
    module: {
        rules: [{
                test: /\.m?jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ]
            }
        ]
    }
}