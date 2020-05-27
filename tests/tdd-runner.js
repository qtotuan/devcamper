var test = require('tape')
var path = require('path')
const colors = require('colors') // eslint-disable-line no-unused-vars
const tapSpec = require('tap-spec')
const pump = require('pump')
const glob = require('glob')

process.env.NODE_ENV = 'test'

/*
To run in tdd mode, use command

npm run tdd

This will run all .spec.js files in the "/tests" folder

Alternatively you can specify one or more patterns, like so

npm run tdd tests/controllers/**.spec.js tests/utils/**.spec.js
*/

pump(test.createStream(), tapSpec(), process.stdout, function (err) {
  console.log('pipe finished', err)
})

let pathPatterns = process.argv.slice(2)

if (!pathPatterns.length) {
  // default to "/tests" folder if not path or pattern is provided as an argument
  pathPatterns = ['tests/**/*.spec.js']
}

// match pattern with files names and require them for execution with tape test
pathPatterns.forEach(pattern => {
  glob.sync(pattern).forEach((file) => {
    require(path.resolve(file))
  })
})
