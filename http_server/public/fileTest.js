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

function logData() {
  $(function() {
    $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
      function(json) {
        var preface = "Experiment successful! Save the line below somewhere for future analysis.";
        document.getElementById('preface').innerHTML = preface;

        var ip = json.ip;
        var paid = $('#paid').prop('checked') ? "paid" : "free";
        var mobile = $('#mobile').prop('checked') ? "mobile" : "computer";
        var time = Date.now();
        var result = time + ", " + ip + ", " + paid + ", " + mobile;
        document.getElementById('result').innerHTML = result;
    });
  });
}
function uploadAll() {
  singleUpload(16, function() {
    singleUpload(64, function() {
      singleUpload(256, function() {
        singleUpload(1024, function() {
          logData();
        });
      });
    });
  });
}
