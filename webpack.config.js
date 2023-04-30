const path = require('path')
const FBROOT = "./src/init-fb";

//Bundles
module.exports = [
    /*
    * ALL BUNDLES HAVE FBROOT BUNDLED BY DEFAULT
    */
   
    // home.js
    {
        entry: [FBROOT, "/src/index", "/src/login", "/src/listener"],
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "index.js"
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
    // projects.js
    {
        entry: [FBROOT, "/src/projects", "/src/login", "/src/listener"],
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "projects.js"
        }
    }
    
];