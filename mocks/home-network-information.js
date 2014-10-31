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
    var responseStatus = 200;

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
      case 'random-hash-3333':
        response = {
          status: 'complete',
          wifi: {
            status: 'on',
            rag: 'green',
            encryption: {
              type: 'No Encryption',
              rag: 'red',
              resolution: 'There is no encryption enabled on the customer\'s home network. Recommend the customer enables encryption.'
            }
          }
        };
        break;
      case 'random-hash-4444':
        response = {
          status: 'complete',
          wifi: {
            status: 'off',
            rag: 'red',
            resolution: 'The wireless interface on the customers router is inactive. Recommend the customer activates their router wireless interface.',
            encryption: {
              type: 'WEP',
              rag: 'grey'
            }
          }
        };
        break;
      case 'random-hash-5555':
        response = {
          status: 'complete',
          wifi: {
            status: 'off',
            rag: 'red',
            resolution: 'The wireless interface on the customers router is inactive. Recommend the customer activates their router wireless interface.',
            encryption: {
              type: 'No Encryption',
              rag: 'grey'
            }
          }
        };
        break;
      case 'random-hash-6666':
        response = {
          status: 'complete',
          wifi: {
            status: 'unknown',
            rag: 'red',
            encryption: {
              type: 'unknown',
              rag: 'grey'
            }
          }
        };
        break;
      case 'random-hash-7777':
        response = {
          status: 'progressing'
        };
        break;
      case 'random-hash-8888':
        response = {
          status: 'failed',
          'error_message': 'Router is not compatible.'
        };
        responseStatus = 502;
        break;
      case 'random-hash-9999':
        response = {};
        responseStatus = 500;
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
          },
          devices: [
            {
              name: 'Sky+HD Box',
              type: 'ethernet'
            },
            {
              name: 'Suzy\'s iPhone 5S',
              type: 'wireless'
            },
            {
              name: 'Unnamed device',
              type: 'ethernet'
            }
          ]
        };
    }

    res.status(responseStatus).send(response);
  });

  app.use('/api/home-network-information', homeNetworkInformationRouter);
};

