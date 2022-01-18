const config = require('../project.config.json');
const fs = require('fs');
const logger = require.main.require('log4js').getLogger(`cloudux-starter-kit-service ${__filename}`);

fs.writeFileSync('./project.config.json', JSON.stringify(config, null, '  '));

const util = require('util');
const bal = require('proxy-bal');
const ops = require('../config/service.ops.config.json');

/**
 * BUS Service instance.
 * @param  {Object} access  bal.createAccess()
 * @param  {Object} [options] Options object. Default empty object.
 * @returns {void}
 */
const Service = function (access, options) {
    Service.super_.call(this,
        access,
        {
            serviceType: config.identity.serviceName,
            description: config.identity.description,
            serviceRealm: config.identity.realm,
            serviceVersion: config.identity.version,
            ops: ops,
        },
        options);
};

util.inherits(Service, bal.Service);

const serviceRoot = require("./endpoints/serviceroot.js");
const location = require("./endpoints/location.js");
const server = require("./util/server.js");

function getIDFromJson(paramSet){
    path = decodeURIComponent(paramSet);
    return path.startsWith('/') ? path.substring(1) : path;
}

Service.prototype.getServiceRoot = function(req, operationContext) {
    try {
        console.log("getServiceRoot");
        const res = serviceRoot.serviceRoot(server);
        logger.info("getServiceRoot res:", res);
        operationContext.reply(res);
    } catch (e) {
        operationContext.reply(e);
    }
};

Service.prototype.folders = function(req, operationContext) {
    try {
        const filter = req.paramSet ? (req.paramSet.filter || null) : null;
        const id = getIDFromJson(req.paramSet.id);
        const res = location.loc_collection_for_id(server, filter, id);
        logger.info("folders res:", res);
        operationContext.reply(res);
    } catch (e) {
        operationContext.reply(e);
    }
};

Service.prototype.items = function(req, operationContext) {
    try {
        console.log("items");
        const id = getIDFromJson(req.paramSet.id);
        const res = location.loc_item_for_id(server, id);
        logger.info("items res:", res);
        operationContext.reply(res);
    } catch (e) {
        operationContext.reply(e);
    }
};

Service.prototype.locations = function(req, operationContext) {
    try {
        console.log("locations");
        const res = location.loc_locations(server);
        logger.info("locations res:", res);
        operationContext.reply(res);
    } catch (e) {
        operationContext.reply(e);
    }
};

Service.prototype.collection = function(req, operationContext) {
    try {
        console.log("collection");
        const filter = req.paramSet ? (req.paramSet.filter || null) : null;
        const id = getIDFromJson(req.paramSet.id);
        const res = location.collection(server, filter, id);
        logger.info("collection res:", res);
        operationContext.reply(res);
    } catch (e){
        operationContext.reply(e);
    }
};

module.exports = function(access, options) {
    return new Service(access, options);
};
