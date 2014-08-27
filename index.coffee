v = document.querySelector('video')
c = document.querySelector('#webcam')
d = document.querySelector('#draw')

dimensions = {}
vctx       = c.getContext('2d')
dctx       = d.getContext('2d')

v.addEventListener 'loadedmetadata', ->
  dimensions =
    w: v.videoWidth
    h: v.videoHeight

  c.setAttribute 'width', v.videoWidth+"px"
  c.setAttribute 'height', v.videoHeight+"px"
  d.setAttribute 'width', v.videoWidth+"px"
  d.setAttribute 'height', v.videoHeight+"px"

navigator.webkitGetUserMedia {video: true}, (stream) ->
  v.src = window.URL.createObjectURL(stream)


  localMediaStream = stream
  frame()
, -> alert "something is broke with your camera :("


frame = ->
  vctx.drawImage(v, 0, 0)
  process()
  requestAnimationFrame(frame)


bright = (index, ctx) ->
  (ctx[index] + ctx[index+1] + ctx[index+2])/3 > 180

process = ->
  return unless dimensions.w

  imageData = vctx.getImageData(0, 0, dimensions.w, dimensions.h);
  drawData  = dctx.getImageData(0, 0, dimensions.w, dimensions.h);

  for y in [0...dimensions.h]
    for x in [0...dimensions.w]
      index = (y * dimensions.w + x) * 4

      if (bright(index, imageData.data))
        drawData.data[index]   = 255
        drawData.data[++index] = 0
        drawData.data[++index] = 0
        drawData.data[++index] = 255

  dctx.putImageData(drawData, 0, 0)