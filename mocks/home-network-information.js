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
      case 'random-hash-3333':
        response = {
          status: 'complete',
          wifi: {
            status: 'on',
            rag: 'green',
            encryption: {
              type: 'No encryption',
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
            rag: 'grey',
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
            rag: 'grey',
            resolution: 'The wireless interface on the customers router is inactive. Recommend the customer activates their router wireless interface.',
            encryption: {
              type: 'No Encryption',
              rag: 'grey'
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

