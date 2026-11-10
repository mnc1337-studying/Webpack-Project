const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production'
    const hash = isProd ? '.[contenthash:8]' : ''
    const styleLoader = isProd ? MiniCssExtractPlugin.loader : 'style-loader'

    return {
        context: path.resolve(__dirname, 'src'),
        entry: './scripts/index.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: `js/[name]${hash}.js`,
            clean: true,
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        devtool: isProd ? false : 'eval-source-map',
        optimization: {
            runtimeChunk: 'single',
            minimizer: ['...', new CssMinimizerPlugin()],
        },
        plugins: [
            new HtmlWebpackPlugin({ template: './index.html' }),
            ...(isProd
                ? [new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash:8].css' })]
                : []),
            ...(env && env.analyze
                ? [new BundleAnalyzerPlugin({ analyzerMode: 'static', reportFilename: 'report.html' })]
                : []),
        ],
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: ['babel-loader', 'ts-loader'],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader',
                },
                {
                    test: /\.css$/,
                    use: [styleLoader, 'css-loader'],
                },
                {
                    test: /\.less$/,
                    use: [styleLoader, 'css-loader', 'less-loader'],
                },
                {
                    test: /\.s[ac]ss$/,
                    use: [styleLoader, 'css-loader', 'sass-loader'],
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
            watchFiles: ['src/index.html'],
        },
    }
}