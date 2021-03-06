// Generated by CoffeeScript 1.6.3
(function() {
  var bright, c, d, dctx, dimensions, frame, process, v, vctx;

  v = document.querySelector('video');

  c = document.querySelector('#webcam');

  d = document.querySelector('#draw');

  dimensions = {};

  vctx = c.getContext('2d');

  dctx = d.getContext('2d');

  v.addEventListener('loadedmetadata', function() {
    dimensions = {
      w: v.videoWidth,
      h: v.videoHeight
    };
    c.setAttribute('width', v.videoWidth + "px");
    c.setAttribute('height', v.videoHeight + "px");
    d.setAttribute('width', v.videoWidth + "px");
    return d.setAttribute('height', v.videoHeight + "px");
  });

  navigator.webkitGetUserMedia({
    video: true
  }, function(stream) {
    var localMediaStream;
    v.src = window.URL.createObjectURL(stream);
    localMediaStream = stream;
    return frame();
  }, function() {});

  frame = function() {
    vctx.drawImage(v, 0, 0);
    process();
    return requestAnimationFrame(frame);
  };

  bright = function(index, ctx) {
    return (ctx[index] + ctx[index + 1] + ctx[index + 2]) / 3 > 180;
  };

  process = function() {
    var drawData, imageData, index, x, y, _i, _j, _ref, _ref1;
    if (!dimensions.w) {
      return;
    }
    imageData = vctx.getImageData(0, 0, dimensions.w, dimensions.h);
    drawData = dctx.getImageData(0, 0, dimensions.w, dimensions.h);
    for (y = _i = 0, _ref = dimensions.h; 0 <= _ref ? _i < _ref : _i > _ref; y = 0 <= _ref ? ++_i : --_i) {
      for (x = _j = 0, _ref1 = dimensions.w; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        index = (y * dimensions.w + x) * 4;
        if (bright(index, imageData.data)) {
          drawData.data[index] = 255;
          drawData.data[++index] = 0;
          drawData.data[++index] = 0;
          drawData.data[++index] = 255;
        }
      }
    }
    return dctx.putImageData(drawData, 0, 0);
  };

}).call(this);
