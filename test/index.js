import autoprefixer from 'autoprefixer'
import fs from 'fs'
import postcssImport from 'postcss-import'
import plugin from '../index.js'
import postcss from 'postcss'
import test from 'ava'

function run (opts) {
  let inputCSS = fs.readFileSync('./fixtures/index.css', 'utf8')

  return postcss([
    postcssImport,
    autoprefixer({ browsers: ['last 2 versions'] }),
    plugin(opts)
  ]).process(inputCSS)
}

test('should not remove warnings', t => {
  return run().then(result => {
    t.is(result.messages.length, 2)
  })
})

test('warnings from the specified directory should be removed ', t => {
  return run({ ignoreFiles: /error-1/ }).then(result => {
    t.is(result.messages.length, 1)
  })
})

test('warnings from the specified directories should be removed ', t => {
  return run({ ignoreFiles: [/error-1/, /error-2/] }).then(result => {
    t.is(result.messages.length, 0)
  })
})
