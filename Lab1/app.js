var net = require('net');

process.stdin.setEncoding('utf8');

function RequestEcho(msg) {
  var client = new net.Socket();
  client.connect(process.argv[3], process.argv[2], function() {
    client.write("GET /echo.php?message=" + msg + "HTTP/1.1\r\n\r\n");
  });

  client.on('data', function(data) {
    console.log(data.toString('utf-8'));
    client.destroy();
  });
}

process.stdin.on('readable', () => {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    RequestEcho(chunk);
  }
});
