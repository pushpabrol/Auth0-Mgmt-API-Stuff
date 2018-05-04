## Auth0 Update SAML Connection encryption certs

This example shows how you can use the Auth0 Management API to update the encryption 

1. create a new private public key pair for encryption
 - openssl req -new -x509 -days 365 -nodes -sha256 -out saml.crt -keyout saml.pem
 - Save these 2 files in the certs folder

2. In the Auth0 Management Console create a new application of type `Machine to Machine Applications`. Call that application "Management API Client"
  - From the API drop down select the Auth0 Managemment API as the API and then authorize the "Management API Client" to have 
      - read:connections, update:connections, delete:connections, create:connections scope

3. Clone this repo

4. Copy the client_id and secret of the client created in Step 2 and the auth0 domain ( e.g. tenant.auth0.com) into the .env.example file and rename it to .env

5. Also copy the name of the connection from Auth0 and set the value of `Connection_Name` as the connection name 

6. Install the dependencies using - `npm install`

5. Run the update  - `node index.js`. This will update the connection with the new encryption key and cert and then download the metadata and share with the IDP