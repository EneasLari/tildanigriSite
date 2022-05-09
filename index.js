const { Console } = require('console');
const fs = require('fs');
var paths = []
var recursives = 0
const getDirectories = (source, outputpath, callback) =>
    fs.readdir(source, { withFileTypes: true }, (err, files) => {
        if (err) {
            callback(err)
        } else {
            //delete only the first time the output directory
            if (recursives === 0) {
                deletedirectories(outputpath)
            }
            files.forEach(element => {
                if (element.isDirectory()) {
                    recursives++
                    getDirectories(source + '/' + element.name, outputpath, (directories) => {
                        paths.push(source + '/' + element.name)
                        recursives--
                        if (recursives === 0) {

                            paths.forEach(existinpath => {
                                //console.log("kav2/" + element)
                                createDirectories(outputpath, existinpath)

                            });
                            console.log("Finished CREATING DIRECTORIES")
                            paths.forEach(path => {
                                readfiles(path, outputpath)
                            })
                        }
                    })
                } 
            });
            callback(
                files
                    .filter(dirent => dirent.isDirectory())
                    .map(dirent => dirent.name)
            )

        }
    })


function deletedirectories(outputpath) {
    console.log(outputpath)
    if (fs.existsSync(outputpath)) {
        //console.log('Directory exists!Lets Delete it');
        // delete directory recursively
        try {
            fs.rmSync(outputpath, { recursive: true });

            //console.log(`${outputpath} is deleted!`);
        } catch (err) {
            console.error(`Error while deleting ${outputpath}.`);
        }

    }

    console.log("DIRECTORIES DELETED")
}

function createDirectories(outputpath, element) {
    try {
        fs.mkdirSync(outputpath + '/' + element, { recursive: true });
        //console.log("Directory is created.");
    } catch (error) {
        console.error(`Error while creating ${outputpath + '/' + element}.`);
    }
    //console.log("CREATED DIRECTORY: ", outputpath + '/' + element,)
}

function readfiles(path, outputpath) {
    //console.log("files")
    try {
        var files = fs.readdirSync(path)
        //console.log(path,files)
        files.forEach(file => {
            if (file.includes('.htm')) {
                //console.log(">>>>>", file);
                try {
                    var data = fs.readFileSync(path + "/" + file, 'utf8')
                    if (data.includes('</head>')) {
                        //console.log("HHEAD FOUND")
                        data = data.replace('</head>', "foxyyyyyyyyyyy")
                        try {
                            fs.writeFileSync(outputpath + '/' + path + '/' + file, data)

                        } catch (error) {
                            return console.error(error);
                        }
                    }
                } catch (error) {
                    console.error(error);
                    return;
                }
            } else {
                var src = path + "/" + file
                var dest = outputpath + '/' + path + '/' + file
                //
                try {
                    console.log(src,dest)
                    fs.copyFileSync(src, dest)
                    //console.log("COPIED: ", src + " ==> " + dest)
                } catch (error) {
                    //console.log('NOW??',path + "/" + file)
                    console.log("Problem with copying file: ", src + "==>" + dest)
                }
            }
        });

    } catch (error) {

    }

}

getDirectories('public_html', 'OUT_public_html', () => {
})
