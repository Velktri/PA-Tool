module.exports = {
    projects: [
        './packages/repo2',
        {
            root: './dev',
            package: './package.json',
            globalComponents: ['./src/components/**/*.vue']
        }
    ]
}