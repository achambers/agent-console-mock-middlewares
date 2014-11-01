module.exports = function(app) {
  var express = require('express');
  var deviceRebootsRouter = express.Router();
  var counter;

  deviceRebootsRouter.post('/', function(req, res) {
    var identifier = req.body['sns_service_id'];
    var response;
    var responseStatus = 201;

    switch(identifier) {
      case '4444':
        response = {};
        responseStatus = 500;

      default:
        counter = 0;

        response = {
          '_links': {
            'diag:latest_reboot_job': {
              'href': '/api/device-reboots/random-hash-' + identifier
            }
          }
        };
    }

    res.status(responseStatus).send(response);
  });

  deviceRebootsRouter.get('/:identifier', function(req, res) {
    var identifier = req.params.identifier;
    var statuses = ['progressing', 'progressing', 'progressing', 'progressing', 'completed'];
    var status = statuses[counter];
    var responseStatus = 200;
    var response;

    switch(identifier) {
      case 'random-hash-3333':
        response = {
          'status': 'failed',
          'error_message': 'Device is not compatible'
        };
        responseStatus = 502;
        break;

      default:
        counter += 1;
        if (counter === statuses.length) {
          counter = 0;
        }

        response = {
          'status': status
        };
    }

    res.status(responseStatus).send(response);
  });

  app.use('/api/device-reboots', deviceRebootsRouter);
};
