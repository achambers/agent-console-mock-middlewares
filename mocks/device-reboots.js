module.exports = function(app) {
  var express = require('express');
  var deviceRebootsRouter = express.Router();
  var counter;

  deviceRebootsRouter.post('/', function(req, res) {
    var identifier = req.body['sns_service_id'];

    counter = 0;

    var response = {
      '_links': {
        'diag:latest_reboot_job': {
          'href': '/api/device_reboots/random-hash-' + identifier
        }
      }
    };

    res.status(201).send(response);
  });

  deviceRebootsRouter.get('/:identifer', function(req, res) {
    var identifier = req.params.identifier;
    var statuses = ['progressing', 'progressing', 'progressing', 'progressing', 'complete'];
    var status = statuses[counter];

    counter += 1;
    if (counter === statuses.length) {
      counter = 0;
    }

    var response = {
      'status': status
    };

    res.send(response);
  });

  app.use('/api/device_reboots', deviceRebootsRouter);
};
