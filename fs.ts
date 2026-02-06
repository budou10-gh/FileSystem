//% icon="/"
//% color="#ffce59"
//% block="FileSystem"
namespace fs {
    let currentDir = "./"
    let fileList: string[] = []
    let dirList: string[] = []
    let contentList: string[] = []

    //% block="cd $dir"
    //% weight=100
    export function cd(dir: string) {
        if (dirList.indexOf(currentDir + dir + "/") !== -1 && !dir.includes("/")) {
            currentDir = currentDir + dir + "/"
            return true
        } else {
            return false
        }
    }
    //% block="write name: $file content: $content"
    //% weight=100
    export function write(file: string, content: string) {
        if (file.includes("/")) {
            return false
        }
        if (fileList.indexOf(currentDir + file) !== -1) {
            const index = fileList.indexOf(currentDir + file)
            fileList.splice(index, 1)
            contentList.splice(index, 1)
        }
        fileList.push(currentDir + file)
        contentList.push(content)
        return true
    }

    //% block="read $file"
    //% weight=100
    export function read(file: string) {
        if (fileList.indexOf(currentDir + file) !== -1 || !file.includes("/")) {
            const index = fileList.indexOf(currentDir + file)
            return contentList[index]
        } else {
            return ""
        }
    }

    //% block="md $dir"
    //% weight=100
    export function md(dir: string) {
        if (dirList.indexOf(currentDir + "/" + dir + "/") === -1 && !dir.includes("/")) {
            dirList.push(currentDir + "/" + dir + "/")
            return true
        } else {
            return false
        }
    }

    //% block="dir"
    //% weight=100
    export function dir() {
        return dirList.concat(fileList)
    }

    //% block="pwd"
    //% weight=100
    export function pwd() {
        return currentDir
    }

    //% block="del"
    //% weight=100
    export function del(file: string) {
        if (fileList.indexOf(file) !== -1){
            const indexOfFile: number = fileList.indexOf(file)
            fileList.splice(indexOfFile, 1)
            contentList.splice(indexOfFile, 1)
            return true
        } else {
            return false
        }
    }
}