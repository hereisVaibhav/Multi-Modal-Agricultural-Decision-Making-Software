const http = require('http');

const data = JSON.stringify({
  plant: "Tomato",
  temperature: 24,
  humidity: 60,
  soilType: "Loam"
});

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/predict',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', body);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();
