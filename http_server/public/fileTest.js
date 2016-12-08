baseUrl = 'http://23.236.48.150:3000/';

function toGet(size) {
  return baseUrl + "get/" + size;
}
function toPost(size) {
  return baseUrl + "post/" + size;
}

function downloadHelper(size, cb) {
  var url = baseUrl + "get/" + size;
  $.ajax({
    url: toGet(size),
    success: cb,
    cache: false
  });
}

function singleDownload(size) {
  downloadHelper(size, function() {
    alert("Downloaded file of size " + size + "!");
  });
}

function uploadHelper(size, cb) {
  var localUrl = size + "kb.dat";
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
    url: localUrl,
    type: 'GET',
    contentType: 'application/octet-stream',
    processData: false,
    success: onSuccess
  });
}

function singleUpload(size) {
  uploadHelper(size, function() {
    alert("Uploaded file of size " + size + "!");
  })
}

function logData() {
  $(function() {
    $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
      function(json) {
        var ip = json.ip;
        var paid = $('#paid').prop('checked') ? "paid" : "free";
        var mobile = $('#mobile').prop('checked') ? "mobile" : "computer";
        var time = Date.now();
        var result = time + ", " + ip + ", " + paid + ", " + mobile;
        document.getElementById('result').innerHTML = result;
    });
  });
}
