module.exports = {
    navigateFallback: '/index.html',
    stripPrefix: 'dist/',
    root: 'dist/',
    staticFileGlobs: [
        'dist/index.html',
        'dist/**.js',
        'dist/**.css',
        'dist/**.map'
    ],
    runtimeCaching: [
        {
            urlPattern: /\/openmrs\/ws\/rest\/v1/,
            handler: 'networkFirst'
        }
    ],
    importScripts: ["offline.js"]
};
