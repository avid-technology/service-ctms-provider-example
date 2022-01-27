const path = require('path');
const starterKitService = require('cloudux-starter-kit-service');
const config = require('../project.config.json');

starterKitService({
    project: path.join(__dirname, '../'),
    name: config.identity.serviceName,
    config: {
        version: config.identity.version.toString(),
        developerID: config.signing.developerID,
        organization: config.signing.organization,
        appID: config.identity.appID,
        appSecret: config.identity.appSecret,
    },
    buildImage: true,
});
