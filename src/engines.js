const exec = require('child_process').exec

const publishingEngine = exec('node ./engines/publishingEngine/engine.js', (error, stdout, stderr) => {
  console.log('stdout: ', stdout)
  console.log('stderr: ', stderr)

  if (error !== null) {
    console.log('exec error: ', error)
  }
})

publishingEngine.stdout.on('data', data => {
  console.log(data)
})

publishingEngine.stderr.on('data', data => {
  console.log(data)
})

const taggingEngine = exec('node ./engines/taggingEngine/engine.js', (error, stdout, stderr) => {
  console.log('stdout: ', stdout)
  console.log('stderr: ', stderr)

  if (error !== null) {
    console.log('exec error: ', error)
  }
})

taggingEngine.stdout.on('data', data => {
  console.log(data)
})

taggingEngine.stderr.on('data', data => {
  console.log(data)
})
