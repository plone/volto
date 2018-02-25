#!/usr/bin/env node
let shell = require('shelljs')
let colors = require('colors')

let appName = process.argv[2];
let appDirectory = `${process.cwd()}/${appName}`;

const run = async () => {
    let success = await createReactApp()
    if(!success){
      console.log('Something went wrong while trying to create a new React app using create-react-app'.red)
      return false;
    }
    await cdIntoNewApp()
  }
  
  const createReactApp = () => {
    return new Promise(resolve=>{
      if(appName){
        shell.exec(`create-react-app ${appName}`, (code) => {
          console.log("Exited with code ", code)
          console.log("Created react app")
          resolve(true)
        })
      }else{
        console.log("\nNo app name was provided.".red)
        console.log("\nProvide an app name in the following format: ")
        console.log("\ncreate-plone-react-app ", "app-name\n".cyan)
          resolve(false)
      }
    })
  }
  
  const cdIntoNewApp = () => {
    return new Promise(resolve=>{
      shell.cd(appDirectory)
      resolve()
    })
  }

  run();
