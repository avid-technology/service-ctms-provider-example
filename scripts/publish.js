const path = require('path');
const starterKitService = require('cloudux-starter-kit-service');
const config = require('../project.config.json');

starterKitService({
    project: path.join(__dirname, '../'),
    name: config.identity.serviceName,
    password: '',
    config: {
        version: config.identity.version.toString(),
        organization: config.signing.organization,
        developerID: config.signing.developerID,
        privateKeyPath: config.signing.privateKeyPath,
        appID: config.identity.appID,
        appSecret: config.identity.appSecret,
    },
    publish: true,
});
