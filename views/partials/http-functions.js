module.exports = function getHTML (options, callback) {
  var printData = [];
  var https = require('https');

  https.get(options, function (response) {

    response.setEncoding('utf8');

    response.on('data', function (data) {
      printData.push(data);
      callback(data);
    });
  });
};
