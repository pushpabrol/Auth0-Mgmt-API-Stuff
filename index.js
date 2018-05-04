var fs = require('fs');
var path = require('path');
var _ = require('lodash');

require('dotenv').config()

var key = fs.readFileSync(path.join(__dirname, 'saml.pem'));
key = key.toString('utf8').replace(/\n/g, '\n');

var cert = fs.readFileSync(path.join(__dirname, 'saml.crt'));
cert = cert.toString('utf8').replace(/\n/g, '\n');

const tools = require('auth0-extension-tools');


tools.managementApi.getClient({ domain: process.env.Auth0Domain, clientId: process.env.Management_ClientId, clientSecret: process.env.Management_ClientSecret})
  .then(function(client) {
    // Use the client...
    client.connections.getAll(function(error, connections){
        if(error)  { console.log(error); return;}
        var connection = _.find(connections, {name: process.env.Connection_Name, strategy :'samlp'});
       
        var subest = _.pick(connection, ['options.domain_aliases','options.signInEndpoint','options.signingCert','options.decryptionKey','options.signOutEndpoint']);
        
        subest.options.decryptionKey = { key : key,  cert: cert};

        var identity = _.pick(connection, ['id']);

        client.connections.update(identity,subest,function(err, conn){
            if(error) console.log(error);
            else {
              console.log('...Updated Connection...')
              console.log(conn);
            }

        });

    })

    });
 









