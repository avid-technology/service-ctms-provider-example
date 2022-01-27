"use strict";

const config = require('../../project.config.json')
let filesystemStoreDir = require('../constans').pathConfig.cloudUx;
filesystemStoreDir = filesystemStoreDir.startsWith('/') ? filesystemStoreDir.substring(1) : filesystemStoreDir;

module.exports = new function () {
    this.serverName = config.connection.hostIp;
    this.protocol = "https";
    this.systemID = config.identity.serviceName;
    this.serviceRealm = config.identity.realm;
    this.serviceName = config.identity.serviceName;
    this.systemType = config.identity.type;
    this.serviceVersion = config.identity.version;
    this.url = function (path) {
        path = path.endsWith('/') ? path.slice(0, -1) : path;
        // if string includes path to an asset
        if (path.includes('/')) {
            let pathArray = path.split('/');
            // pathArray.splice(1, 0, filesystemStoreDir);
            path = pathArray.join('/');
        }
        const tempPath = path.toString().split('/');
        const method = tempPath[0] + '/';
        tempPath.shift();
        if (tempPath.length === 0) {
            path = '';
        } else {
            path = tempPath.join('/');
        }
        path = path.replace(/ /g, '%20').replace(/\//g, '%2F');
        return this.protocol + "://" + this.serverName + "/apis/" + this.serviceName + ";version=" + this.serviceVersion +
            ";realm=" + this.serviceRealm + "/" + method + path;
    };
}();
