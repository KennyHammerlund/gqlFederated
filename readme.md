# GQL Federated Example
This server when running on local mode will monitor the two service folders for products and recommendations for changes. If changes are found then the gateway will wait 3 seconds and restart gathering the changes from the subservices. 

### Getting started
1. Open a terminal tab in the recomendations.product folder: run `yarn start:local` 
2. Open another terminal tab in the service.product folder: run `yarn start:local` 
3. Open another terminal tab in the gateway folder: run `yarn start:local` 
