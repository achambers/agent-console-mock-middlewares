module.exports = function(app) {
  var express = require('express');
  var homeNetworkInformationRouter = express.Router();

  homeNetworkInformationRouter.post('/', function(req, res) {
    var identifier = req.body['sns_service_id'];

    var response = {
      '_links': {
        'diag:latest_home_network_information_job': {
          'href': '/api/home-network-information/random-hash-' + identifier
        }
      }
    };

    res.status(201).send(response);
  });

  homeNetworkInformationRouter.get('/:identifier', function(req, res) {
    var identifier = req.params.identifier;

    var response;

    switch(identifier) {
      case 'random-hash-2222':
        response = {
          status: 'complete',
          wifi: {
            status: 'on',
            rag: 'green',
            encryption: {
              type: 'WEP',
              rag: 'amber',
              resolution: 'Customer home network has basic WEP encryption only. Recommend customer upgrades to a stronger encryption mode.'
            }
          }
        };
        break;
      default:
        response = {
          status: 'complete',
          wifi: {
            status: 'on',
            rag: 'green',
            encryption: {
              type: 'WPA2',
              rag: 'green',
            }
          }
        };
    }

    res.send(response);
  });

  app.use('/api/home-network-information', homeNetworkInformationRouter);
};

