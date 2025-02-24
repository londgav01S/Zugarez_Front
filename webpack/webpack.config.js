module.exports = {
    resolve: {
        fallback: {
            "assert": require.resolve("assert/"),
            "url": require.resolve("url/")
        }
    }
};
