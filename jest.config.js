module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFiles: [
        "<rootDir>/.jest/setEnvVars.js"
    ],
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.test.json"
        }
    }
};