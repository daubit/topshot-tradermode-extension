import { watch } from 'chokidar';
import shell from "shelljs"


// One-liner for current directory
watch('./src').on('all', (event, path) => {
    if (event === "change" && path === "src/index.js") {
        const res = shell.exec(`browserify ${path} -o public/index.js`)
        console.log("Compiling...")
        setTimeout(() => shell.exec("clear"), 1000)
    }
});