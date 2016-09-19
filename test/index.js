/* globals describe, it */

const getColors = require('..')
const assert = require('assert')
const fs = require('fs')

describe('get-image-colors', function () {

  const testPalette = (err, palette, done) => {
    if (err) throw err
    assert(Array.isArray(palette))
    assert(palette.length)
    palette = palette.map(color => color.hex())
    console.log()
    console.info('Palette: ', palette)
    assert(palette[0].match(/^#[0-9a-f]{3,6}$/i))
    done()
  }


  it('works on base64 images', (done) => {
    const base64image = fs.readFileSync(__dirname + '/fixtures/thumb.base64').toString()
    getColors({ fileName: base64image }, (err, palette) => ( testPalette(err, palette, done) ))
  })

  it('works on JPG images', (done) => {
    getColors({ fileName: __dirname + '/fixtures/thumb.jpg' }, (err, palette) => ( testPalette(err, palette, done) ))
  })

  it('works on GIF images', (done) => {
    getColors({ fileName: __dirname + '/fixtures/thumb.gif' }, (err, palette) => ( testPalette(err, palette, done) ))
  })

  it('works on PNG images', (done) => {
    getColors({ fileName: __dirname + '/fixtures/thumb.png' }, (err, palette) => ( testPalette(err, palette, done) ))
  })

  it('works on SVG images', (done) => {
    getColors({ fileName: __dirname + '/fixtures/thumb.svg' }, (err, palette) => ( testPalette(err, palette, done) ))
  })

})
