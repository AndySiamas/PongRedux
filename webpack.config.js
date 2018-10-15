const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: ['babel-polyfill', __dirname + '/client/src/Components/index.jsx'],
    module: {
    rules: [
        { 
        test: [/\.jsx$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
            presets: ['@babel/preset-react', '@babel/preset-env']	
            }
        },
        {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader'
            ]
        },
        {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
        },
        {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
            }
        }]
        }
    ]
    },
    node: {
        fs: "empty"
    },
    output: {
    filename: 'bundle.js',
    path: __dirname + '/public'
    }
};