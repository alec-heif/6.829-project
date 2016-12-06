function singleDownload(size) {
  var url = "http://23.236.48.150:3000/" + size;
  var onSuccess = function() {
    alert('success!');
  }
  $.ajax({
    url: url,
    success: onSuccess,
    cache: false
  });
}

function downloadAll() {
  var sizes = [16, 64, 256, 1024];
  sizes.forEach(size => {
    var url = "http://23.236.48.150:3000/" + size;
    $.ajax({
      url: url,
      cache: false,
      async: false
    });
  });
  alert('Done!');
}

