const express = require('express')
const app = express()
const request = require('request');
var port = process.env.PORT || 1337;

app.use(express.static('public'))

app.post('/email', function (req, res) {
  console.log(req.query);
  if (req.query['email'].length > 0) {
    request.post(
      'https://hooks.zapier.com/hooks/catch/2562075/rpzj90/',
      { json: { email: req.query['email'] } },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body)
          res.send('Ok');
        } else {
          console.log(error);
          res.status(500).send('Error with hook');
        }
      }
    );
  } else {
    console.log("ERROR");
    res.status(500).send('Email empty');
  }
});

app.post('/create', function (req, res) {
  console.log(req.query);
  if (req.query['name'].length > 0) {
    request.post(
      'https://prod-43.westeurope.logic.azure.com:443/workflows/f8761893ebbd47b0823fff730b811a83/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hOaDG3h0qD9IgV1q2F1s0U767ulzM5W8f37D_TkI6nA',
      { json: { name: req.query['name'], email: req.query['email'] } },
      function (error, response, body) {
        if (!error && (response.statusCode >= 200 && response.statusCode <= 300)) {
          console.log('body:' + body)
          res.send('Ok');
        } else {
          console.log('error:' + error);
          res.status(500).send('Error with hook');
        }
      }
    );
  } else {
    console.log("ERROR");
    res.status(500).send('Email empty');
  }
});

app.listen(port, function () {
  console.log('Example app listening on port', port, '!')
})