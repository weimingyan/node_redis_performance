var redis = require('redis');

function _parse_data(string, property) {
  var regExp = new RegExp(property+':(.*)','g');
  var match = regExp.exec(string);
  return match? match[1] : null;
}

function dataSource(port, host) {
  var client = redis.createClient(port, host);
  this.fetch = function (section, property, callback) {
    client.info(section, function(err, res) {
      callback( err ? null:_parse_data(res, property));
    });
  };
}

module.exports = dataSource;
