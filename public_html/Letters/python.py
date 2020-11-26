import shutil
import os

directory = os.getcwd()
for filename in os.listdir(directory):
    if (filename.endswith(".htm") or filename.endswith(".html")) and filename.startswith("p"):
        path=(os.path.join(directory, 'output'))
        filename2 = filename
        filetoopen=open(filename, 'r')
        fileB = open(os.path.join(path, filename2), 'w+', encoding='utf-8')
        whatIread=filetoopen.read()
        whatIread.replace("iso-8859-7","UTF-8")
        fileB.write(whatIread)
        fileB.close()
        filetoopen.close()
    else:
        continue
