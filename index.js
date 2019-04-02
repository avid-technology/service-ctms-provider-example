#!/usr/bin/env node
const bal = require('proxy-bal');
const logger = require.main.require('log4js').getLogger(`cloudux-starter-kit-service ${__filename}`);

const balConfig = require('./project.config.json');
const log4jsHelper = require('./config/log4jsHelper');
const service = require('./src/service');

const auth = bal.auth;
const clientID = balConfig.identity.appID;

log4jsHelper.log4JsConfiguration();
logger.trace('balConfig File', balConfig);

const clientSecret = balConfig.identity.appSecret;

if (!balConfig.connection.hostIp.length) {
    logger.error('No host specified for gateway.  Check the \'bal.config.json\' file.');
    process.exit(0);
}

if (!balConfig.identity.serviceName.length) {
    logger.error('Service doesn\'t have a type.  Check the \'service.config.json\' file.');
    process.exit(0);
}

const access = bal.createAccess({
    gateway: {
        host: (process.env.ACS_GATEWAY_HOST || balConfig.connection.hostIp),
        app_port: (process.env.ACS_GATEWAY_PORT || ''),
        auth: new auth(clientID, clientSecret),
    },
});

access.on('connected', function () {
    access.registerService(service, {}, function (error, serviceInstance) {
        if (error) {
            logger.error(error);
            return;
        }
        logger.info('Service registered successfully with id: ' + serviceInstance.info.id);
        logger.info('Service type: ' + serviceInstance.info.serviceType);
        logger.info('Service version: ' + serviceInstance.info.serviceVersion);
        logger.info('Service realm: ' + serviceInstance.info.serviceRealm);

    });
});
access.on('disconnected', function () {
    logger.trace('disconnected');
    process.exit(0);
});

access.on('error', function(e) {
    logger.error(e);
    access.disconnect();
});

process.on('SIGTERM', function () {
    logger.trace('SIGTERM');
    access.disconnect();
});

access.connect();

