var imgs = []
var avgImg

var imgStart = 0
var numOfImages = 100

//////////////////////////////////////////////////////////
function preload () {
  // preload() runs once
  let startVal = imgStart
  let toSubtract = imgStart
  let currImage = imgStart

  for (let i = startVal; i < numOfImages; i++) {
    imgs[startVal - toSubtract - 1] = loadImage(
      `assets/set/img${currImage}.jpg`
    )
    toSubtract--
    currImage++
  }
}
//////////////////////////////////////////////////////////
function setup () {
  createCanvas(imgs[0].width * 2, imgs[0].height)
  pixelDensity(1)

  avgImg = createGraphics(imgs[0].width, imgs[0].height)
}
//////////////////////////////////////////////////////////
function draw () {
  background(125)
  image(imgs[0], 0, 0)

  avgImg.loadPixels()

  for (let i = 0; i < imgs.length; i++) {
    imgs[i].loadPixels()
  }

  for (var x = 0; x < imgs[0].width; x++) {
    for (var y = 0; y < imgs[0].height; y++) {
      var index = (y * imgs[0].width + x) * 4

      avgImg.pixels[index + 0] = 255
      avgImg.pixels[index + 1] = 255
      avgImg.pixels[index + 2] = 255
      avgImg.pixels[index + 3] = 255

      var sumR = 0
      var sumG = 0
      var sumB = 0

      for (var i = 0; i < imgs.length; i++) {
        sumR += imgs[i].pixels[index + 0]
        sumG += imgs[i].pixels[index + 1]
        sumB += imgs[i].pixels[index + 2]
      }

      avgImg.pixels[index + 0] = sumR / (numOfImages - imgStart)
      avgImg.pixels[index + 1] = sumB / (numOfImages - imgStart)
      avgImg.pixels[index + 2] = sumG / (numOfImages - imgStart)
    }
  }

  avgImg.updatePixels()
  image(avgImg, avgImg.width, 0)

  noLoop()
}
