var test = require('tape')
var path = require('path')
const colors = require('colors') // eslint-disable-line no-unused-vars
const tapSpec = require('tap-spec')
const pump = require('pump')
const glob = require('glob')

process.env.NODE_ENV = 'test'

/*
This will run all .spec.js files in the "/tests" folder
*/

pump(test.createStream(), tapSpec(), process.stdout, function (err) {
  console.log('pipe finished', err)
})

// find all files in '/tests' folder and execute
glob.sync('tests/**/*.spec.js').forEach((file) => {
  require(path.resolve(file))
})
