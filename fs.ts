//% icon="/"
//% color="#ffce59"
//% block="FileSystem"
namespace fs {
    let currentDir = "/"
    let fileList: string[] = []
    let dirList: string[] = []
    let contentList: string[] = []

    //% block="cd $dir"
    //% weight=100
    export function cd(dir: string) {
        if (dirList.indexOf(currentDir + dir + "/") !== -1 && !dir.includes("/")) {
            currentDir = currentDir + dir + "/"
            return true
        } else if (dir == "../") {
            if(currentDir != "/"){
                // Go to parent folder
                // "/hoge/fuga/" -> ["", "hoge", "fuga", ""] -> ["", "hoge"] -> "/hoge/"
                const pathArr = currentDir.split("/")
                pathArr.pop()
                pathArr.pop()
                pathArr.push("")
                currentDir = pathArr.join("/")
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    //% block="md $dir"
    //% weight=100
    export function md(dir: string) {
        if (dirList.indexOf(currentDir + dir + "/") === -1 && !dir.includes("/")) {
            dirList.push(currentDir + dir + "/")
            return true
        } else {
            return false
        }
    }

    //% block="rd $dir"
    //% weight=100
    export function rd(dir: string) {
        if (dirList.indexOf(currentDir + dir + "/") !== -1) {
            const indexOfDir: number = dirList.indexOf(currentDir + dir + "/")
            dirList.splice(indexOfDir, 1)
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

    //% block="del $file"
    //% weight=100
    export function del(file: string) {
        if (fileList.indexOf(currentDir + file) !== -1) {
            const indexOfFile: number = fileList.indexOf(currentDir + file)
            fileList.splice(indexOfFile, 1)
            contentList.splice(indexOfFile, 1)
            return true
        } else {
            return false
        }
    }

    //% block="dir"
    //% weight=100
    export function dir() {
        const crnt_dirList = dirList.filter((item) => {
            return item.slice(0, currentDir.length) === currentDir && item.split("/").length - 2 == currentDir.split("/").length - 1
        })
        const crnt_fileList = fileList.filter((item) => {
            return item.slice(0, currentDir.length) === currentDir && item.split("/").length - 1 == currentDir.split("/").length - 1
        })
        console.log("Debug: crnt_dirList == " + JSON.stringify(crnt_dirList))
        console.log("Debug: crnt_fileList == " + JSON.stringify(crnt_fileList))
        crnt_dirList.forEach((item) => {
            item = item.slice(0, currentDir.length)
        })
        crnt_fileList.forEach((item) => {
            item = item.slice(0, currentDir.length)
        })
        console.log("Debug: crnt_dirList == " + JSON.stringify(crnt_dirList))
        console.log("Debug: crnt_fileList == " + JSON.stringify(crnt_fileList))
        return crnt_dirList.concat(crnt_fileList)
    }

    //% block="pwd"
    //% weight=100
    export function pwd() {
        return currentDir
    }
}

// TODO
// Dirでの処理をUNIXに近づける
// 以上。
// 肩の力抜いて作業しろよな。