baseUrl = 'http://23.236.48.150:3000/';

function singleDownload(size) {
  var url = baseUrl + "get/" + size;
  var onSuccess = function() {
    alert('success!');
  }
  $.ajax({
    url: toGet(size),
    success: onSuccess,
    cache: false
  });
}

function toGet(size) {
  return baseUrl + "get/" + size;
}
function toPost(size) {
  return baseUrl + "post/" + size;
}

function downloadAll() {
  var sizes = [16, 64, 256, 1024];
  sizes.forEach(size => {
    $.ajax({
      url: toGet(size),
      cache: false,
      async: false
    });
  });
  alert('Done!');
}

function singleUpload(size, cb) {
  var url = size + "kb.dat";
  var onSuccess = function(data) {
    $.ajax({
      url: toPost(size),
      type: 'POST',
      data: data,
      processData: false,
      success: cb
    });
  };
  $.ajax({
    url: url,
    type: 'GET',
    contentType: 'application/octet-stream',
    processData: false,
    success: onSuccess
  });
}

function uploadAll() {
  singleUpload(16, function() {
    singleUpload(64, function() {
      singleUpload(256, function() {
        singleUpload(1024, function() {
          console.log("Done uploading all");
          alert("Experiment done!");
        });
      });
    });
  });
}
