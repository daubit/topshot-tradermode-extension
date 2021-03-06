import { watch } from 'chokidar';
import shell from "shelljs"


// One-liner for current directory
watch('./src').on('all', (event, path) => {
    console.log(`Detecting ${event}`)
    if (event === "change" && path === "src/index.js") {
        shell.exec(`browserify ${path} -o public/index.js`)
        console.log("Compiling...")

    } setTimeout(() => {
        shell.exec("clear");
        shell.exec("echo Waiting for file change...")
    }, 1000)
});