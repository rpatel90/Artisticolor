const path = require('path')
const FBROOT = "./src/init-fb";

module.exports = [ //Bundles
    /*
    * ALL BUNDLES HAVE FBROOT BUNDLED BY DEFAULT
    */
    // home.js
    {
        entry: [FBROOT, "/src/home", "/src/login", "/src/listener"],
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "home.js"
        }
    },
    // profile.js
    {
        entry: [FBROOT, "/src/profile", "/src/login", "/src/listener"],
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "profile.js"
        }
    },
    // register.js
    {
        entry: [FBROOT, "/src/register"],
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "register.js"
        }
    },
    
];