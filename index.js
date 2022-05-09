const fs = require('fs');
var paths = []
var recursives = 0

var started=false;
function consolelogofile(message){
    console.log(message)
    if(started){
        fs.appendFileSync("LOGS.TXT",message+"\n")
    }else{
        started=true
        fs.writeFileSync("LOGS.TXT","LOG START\n")    
    }
    
}


function editHtmlFilesAndCopyTheOther(source, outputpath) {

    var filesRead = fs.readdirSync(source, { withFileTypes: true })
    //delete only the first time the output directory
    if (recursives === 0) {
        deletedirectories(outputpath)
    }
    filesRead.forEach(element => {
        if (element.isDirectory()) {
            recursives++
            editHtmlFilesAndCopyTheOther(source + '/' + element.name, outputpath)
            //////////
            paths.push(source + '/' + element.name)
            recursives--
            if (recursives === 0) {
                consolelogofile("LETS CREATE PATHS")
                paths.forEach(existinpath => {
                    //consolelogofile("kav2/" + element)
                    createDirectories(outputpath, existinpath)

                });
                consolelogofile("LETS ADD FILES")
                paths.forEach(path => {
                    readfiles(path, outputpath)
                })
            }
            //////////
        }
    });
}

function deletedirectories(outputpath) {
    //consolelogofile(outputpath)
    if (fs.existsSync(outputpath)) {
        //consolelogofile('Directory exists!Lets Delete it');
        // delete directory recursively
        try {
            fs.rmSync(outputpath, { recursive: true });

            //consolelogofile(`${outputpath} is deleted!`);
        } catch (err) {
            console.error(`Error while deleting ${outputpath}.`);
        }

    }

    //consolelogofile("DIRECTORIES DELETED")
}

function createDirectories(outputpath, element) {
    try {
        fs.mkdirSync(outputpath + '/' + element, { recursive: true });
        //consolelogofile("Directory is created.");
    } catch (error) {
        console.error(`Error while creating ${outputpath + '/' + element}.`);
    }
    //consolelogofile("CREATED DIRECTORY: ", outputpath + '/' + element,)
}

function readfiles(path, outputpath) {
    //consolelogofile("files")
    try {
        var files = fs.readdirSync(path)
        //consolelogofile(path,files)
        files.forEach(file => {
            if (file.includes('.htm')) {
                //consolelogofile(">>>>>", file);
                try {
                    var data = fs.readFileSync(path + "/" + file, 'utf8')
                    if (data.includes('</head>')) {
                        //consolelogofile("HHEAD FOUND")
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
                    fs.copyFileSync(src, dest)
                    //consolelogofile("COPIED: ", src + " ==> " + dest)
                } catch (error) {
                    //consolelogofile('NOW??',path + "/" + file)
                    //consolelogofile("Problem with copying file: ", src + " ==> " + dest)
                }
            }
        });

    } catch (error) {

    }

}

editHtmlFilesAndCopyTheOther('public_html', 'OUT_public_html')
