import { readDir } from '@tauri-apps/api/fs'
import { watch } from 'tauri-plugin-fs-watch-api'

import * as shell from "@tauri-apps/api/shell"

import progress from "./utils/progress"

let submitBtn = document.getElementsByClassName("submit-btn")[0] as HTMLButtonElement
let fromPathInput = document.getElementsByClassName("from-path")[0] as HTMLInputElement
let toPathInput = document.getElementsByClassName("to-path")[0] as HTMLInputElement
let progressBar = document.getElementsByClassName("progress")[0] as HTMLDivElement
let alphaMatCheckbox = document.getElementsByClassName("alpha-mat-check")[0] as HTMLInputElement
let alphaMatInput = document.getElementsByClassName("alpha-mat-input")[0] as HTMLInputElement
let cardText = document.getElementsByClassName("card-text-field")[0] as HTMLDivElement

submitBtn.onclick = async () => {
    let fromPath = fromPathInput.value
    let toPath = toPathInput.value

    // Catch empty fields, disable submit button
    if (fromPath === "" || toPath === "") { return } // TODO: show error message
    submitBtn.setAttribute("disabled", "")
    console.log("Initiazing...")
    
    // Set up the command with event handlers
    let command = shell.Command.sidecar("../src/rembg", [fromPath, toPath, "-5"])

    console.log("registering events")
    command.on('close', data => {
        console.log(`Python subprocess ended with code ${data.code} and signal ${data.signal}`)
        submitBtn.removeAttribute("disabled")
    })

    command.on('error', error => console.error(`error: "${error}"`))
    command.stdout.on('data', line => console.log("stdout:", line)
        // if (line.startsWith("{")) {
        //     let data = JSON.parse(line)
        //     if (data.message === "processing") {
        //         progress.update(progressBar, (data.current/ data.total) * 100)
        //     } else if (data.message === "done") {
        //         submitBtn.removeAttribute("disabled")
        //     }
        // }
    )
    command.stderr.on('data', line => console.log("stderr:", line))

    // Start the command
    console.log("Python subprocess started...")
    const child = await command.spawn()
    console.log('Pid:', child.pid)
}

alphaMatCheckbox.onchange = () => {
    if (!alphaMatCheckbox.checked) {
        alphaMatInput.setAttribute("disabled", "")
    } else {
        alphaMatInput.removeAttribute("disabled")
    }
}