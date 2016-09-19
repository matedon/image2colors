# get-image-colors

Extract colors from images. Supports GIF, JPG, PNG, and even SVG!

![example color palette](https://cldup.com/-uw9Ub6L6s.png)

## Installation

```sh
npm install get-image-colors --save
```

## Usage

```js
const getColors = require("get-image-colors")

getColors({ fileName: __dirname + 'double-rainbow.png', colorLength: 5}, function(err, colors){
  // colors is an array of colors
})
```

`colors` is an array of [chroma.js](http://gka.github.io/chroma.js) color objects. chroma.js objects have methods that lets you pick the color format you want (RGB hex, HSL, etc), and give you access to powerful color manipulation features:

```js
colors.map(color => color.hex())
// => ['#FFFFFF', '#123123', '#F0F0F0']

colors[0].alpha(0.5).css();
// => 'rgb(0,128,128)''
```

## Options

fileName: could be a path (file system path or url) or base64 data:image
colorLength: restrict the number of result colors (there is a bug with svg images, see: TODO section)

## How it Works

`get-image-colors` uses [get-pixels](http://npm.im/get-pixels) to create a pixel array, then extracts a color palette with [get-rgba-palette](http://npm.im/get-rgba-palette), which uses [quantize](http://npm.im/quantize) under the hood.

Colors are converted from [get-rgba-palette's flat array format](https://github.com/mattdesl/get-rgba-palette#palettepixels-count-quality-filter) into [chroma.js color instances](http://gka.github.io/chroma.js/).

To extract palettes from SVG files, a PNG copy is created on the fly using [svg2png](http://npm.im/svg2png), which depends on PhantomJS. PhantomJS can be installed as a local node module, unlike [canvas](http://npm.im/canvas) which has [external dependencies](https://github.com/Automattic/node-canvas#installation).

## Tests

```sh
npm install
npm test
```

## Dependencies

- [chroma-js](https://github.com/gka/chroma.js): JavaScript library for color conversions
- [get-pixels](https://github.com/scijs/get-pixels): Reads the pixels of an image as an ndarray
- [get-rgba-palette](https://github.com/mattdesl/get-rgba-palette): gets a palette of prominent colors from an array of pixels
- [svg2png](https://github.com/domenic/svg2png): A SVG to PNG converter, using PhantomJS

## Dev Dependencies

- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework

## Credits

The original "get-image-colors" module comes from [zeke](https://github.com/zeke/get-image-colors)
And great thanks giving for all the developers of the required dependencies. 

## TODO

The "colorLength" property works only with raster images.

## License

MIT

