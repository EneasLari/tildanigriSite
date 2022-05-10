const fs = require('fs');
var paths = []


var tag=`
<!--GOOGLEANALYTICS-->
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-EY23HG35ES"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-EY23HG35ES');
</script>
<!--ENDGOOGLEANALYTICS-->
</head
`

var started = false;
function consolelogofile(message) {
    //console.log(message)
    if (started) {
        fs.appendFile("LOGS.TXT", message + "\n", () => {
            //console.log(message)
        })
    } else {
        started = true
        fs.writeFile("LOGS.TXT", "LOG START\n", () => {
            //console.log("START")
        })
    }

}


function editHtmlFilesAndCopyTheOther(source, outputpath) {

    var filesRead = fs.readdirSync(source, { withFileTypes: true })
    //delete only the first time the output directory
    filesRead.forEach(element => {
        if (element.isDirectory()) {
            recursives++
            editHtmlFilesAndCopyTheOther(source + '/' + element.name, outputpath)
            //////////
            paths.push(source + '/' + element.name)
            recursives--

            //////////
        }
    });
}

function deletedirectories(outputpath) {
    //console.log(outputpath)
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

    //console.log("DIRECTORIES DELETED")
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
    console.log(path)
    try {
        var filesindir = fs.readdirSync(path)
        
        for (const myfile of filesindir) {

            if(!fs.existsSync(path + "/" + myfile)){
                console.log(fs.existsSync(path + "/" + myfile))
            }
            if (myfile.includes('.htm')) {
                //console.log(">>>>>", file);
                try {
                    var data = fs.readFileSync(path + "/" + myfile, 'utf8')
                    if (data.includes('</head>')) {
                        //console.log("HHEAD FOUND")
                        data = data.replace('</head>', tag)
                        try {
                            fs.writeFileSync(outputpath + '/' + path + '/' + myfile, data)

                        } catch (error) {
                            return console.error(error);
                        }
                    }else{
                        consolelogofile("WIHTOUT <head> TAG"+outputpath + '/' + path + '/' + myfile)
                        //fs.copyFileSync(path + "/" + myfile, outputpath + '/' + path + '/' + myfile)
                    }
                } catch (error) {
                    console.error(error);
                    return;
                }
            } else {
                var src = path + "/" + myfile
                var dest = outputpath + '/' + path + '/' + myfile
                var st = "LETS COPY: " + src + " ==> " + dest
                try {
                    //fs.copyFileSync(src, dest)
                } catch (error) {
                    var st = "Problem with copying file: " + src + " ==> " + dest
                    consolelogofile(st)
                }
            }
        }

    } catch (error) {

    }

}


function RunMe(out,sourcefolder){

    consolelogofile("start")
    deletedirectories(out)
    editHtmlFilesAndCopyTheOther(sourcefolder, out)
    
    //console.log(paths)
    paths.forEach(existinpath => {
        //console.log("kav2/" + element)
        createDirectories(out, existinpath)
        readfiles(existinpath, out)
    
    });
    readfiles(sourcefolder,out)
}

RunMe("OUT","public_html")

