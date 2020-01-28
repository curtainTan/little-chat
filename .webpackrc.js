
const config = {
    entry: './src/index.js',
    extraBabelPlugins: [
        ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
    ],
    disableCSSModules: true,
    es5ImcompatibleVersions:true,
    disableDynamicImport: false,
    html: {
        template: "./src/index.ejs"
    }
}

export default config
