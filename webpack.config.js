const path = require('path')
module.exports = [
    // firebaseConfig.js
    {
        entry: "./src/firebaseConfig.js",
        output: {
            path: path.resolve(__dirname, "./dist"),
                filename: "firebaseConfig.js"
        }
    },
    // home.js
    {
        entry: "./src/home.js",
        output: {
            path: path.resolve(__dirname, "./dist"),
            filename: "home.js"
        }
    },
    // login.js
    {
        entry: "./src/login.js",
        output: {
            path: path.resolve(__dirname, "./dist"),
            filename: "login.js"
        }
    },
    // profile.js
    {
        entry: "./src/profile.js",
        output: {
            path: path.resolve(__dirname, "./dist"),
            filename: "profile.js"
        }
    },
    // register.js
    {
        entry: "./src/register.js",
        output: {
            path: path.resolve(__dirname, "./dist"),
            filename: "register.js"
        }
    },
];