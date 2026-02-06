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
        if (dirList.indexOf(currentDir + dir) !== -1) {
            currentDir = currentDir + dir + "/"
            return true
        } else {
            return false
        }
    }
    //% block="write name: $file content: $content"
    //% weight=100
    export function write(file: string, content: string) {
        if (fileList.indexOf(currentDir + file) !== -1) {
            const index = fileList.indexOf(currentDir + file)
            fileList.splice(index, 1)
            contentList.splice(index, 1)
        }
        fileList.push(currentDir + file)
        contentList.push(content)
    }

    //% block="read $file"
    //% weight=100
    export function read(file: string) {
        if (fileList.indexOf(currentDir + file) !== -1) {
            const index = fileList.indexOf(currentDir + file)
            return contentList[index]
        } else {
            return null
        }
    }

    //% block="md $dir"
    //% weight=100
    export function md(dir: string) {
        if (dirList.indexOf(currentDir + "/" + dir) === -1) {
            dirList.push(currentDir + "/" + dir)
            return true
        } else {
            return false
        }
    }

    //% block="ls"
    //% weight=100
    export function ls() {
        return fileList
    }

    //% block="pwd"
    //% weight=100
    export function pwd() {
        return currentDir
    }
}