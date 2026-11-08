const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production'
    const hash = isProd ? '.[contenthash:8]' : ''

    return {
        context: path.resolve(__dirname, 'src'),
        entry: './scripts/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: `js/[name]${hash}.js`,
            clean: true,
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        enforce: true
                    },
                },
            },
            runtimeChunk: 'single',
            minimizer: ['...', new CssMinimizerPlugin()],
        },
        plugins: [
            new HtmlWebpackPlugin({ template: './index.html' }),
            ...(isProd
                ? [new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash:8].css' })]
                : []),
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|jpe?g|gif|svg|webp)$/i,
                    type: 'asset/resource',
                    generator: { filename: 'assets/images/[name].[hash:8][ext]' },
                },
                {
                    test: /\.(woff2?|ttf|eot)$/i,
                    type: 'asset/resource',
                    generator: { filename: 'assets/fonts/[name].[hash:8][ext]' },
                },
            ],
        },
        devServer: {
            port: 3000,
            hot: true,
            open: true,
        },
    }
}