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
            urlPattern: /^http:\/\/localhost:8080\/openmrs\/ws\/rest\/v1/,
            handler: 'networkFirst'
        }
    ]
};
