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
          status: 'completed',
          wifi: {
            status: 'on',
            rag: 'green',
            information_text: 'The wireless interface on the customers router is active.',
            encryption: {
              type: 'WEP',
              rag: 'amber',
              information_text: 'Customer\'s home network has basic WEP encryption only.',
              resolution: 'Customer home network has basic WEP encryption only. Recommend customer upgrades to a stronger encryption mode.'
            }
          }
        };
        break;
      case 'random-hash-3333':
        response = {
          status: 'completed',
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
          status: 'completed',
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
          status: 'completed',
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
          status: 'completed',
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
      case 'random-hash-xxxx':
        response = {
          "status": "completed",
          "wifi": {
            "status": "on",
            "rag": "green",
            "information_text": "The wireless interface on the customers router is active.",
            "encryption": {
              "type": "WPA/WPA2+AES",
              "rag": "green",
              "information_text": "There is no encryption on the customers home network.  Customer network is not protected.","resolution":"Please update encryption settings by completing the following steps:\n\n- Open a new browser window and delete the contents of the address bar.\n- Type in 192.168.0.1 and press Enter.\n- If prompted at this point, enter the username and password.\n  - Default Username: admin\n  - Default Password: sky\n- Select the Wireless tab.\n- Select WPA2-PSK under the Security Options\n- Make a note of the Network Key\n- Click Apply at the bottom of the page.\n\nRefresh the status of the In-home diagnostic results using the Action menu.  If the fault is still persistent continue to follow ask dAVe.\n\nThe Jedi can also offer support.\n"
            }
          },
          "devices": [
            {
              "name": "Dans-iPad",
              "type": "wireless"
            },
            {
              "name": "Unknown",
              "type": "ethernet"
            },
            {
              "name": "Islas-iPod",
              "type": "wireless"
            }
          ]
        };
        break;

      default:
        response = {
          status: 'completed',
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

