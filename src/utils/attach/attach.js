const path = require('path-browserify')

module.exports = (async () => {
    //const fs = require('fs')
    //console.log(fs.readdirSync)

    //fs.directoryOpen('/', (err, data) => {
        //console.log(data)
    //})


    const animPath = path.join(__dirname, '..', 'anim')
    // const subdirs = await readdir(animPath)

    // for (i=0; i<subdirs.length; i++) {
    //     if(subdirs[i] == 'error') continue;
    //     const file = await readdir(path.join(animPath, subdirs[i]))
    //     console.log(require(`../anim/${subdirs[i]}/${file}`))
    // }
})()

