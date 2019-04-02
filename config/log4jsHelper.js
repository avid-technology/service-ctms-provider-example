const path = require('path');
const os = require('os');
const log4js = require('log4js');
const fs = require('fs-extra');
const logger = require.main.require('log4js').getLogger(`cloudux-starter-kit-service ${__filename}`);

function log4JsConfiguration() {
    if (typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV.includes('production')) {
        try {
            let configForLogs = require('./log4jsConfigOnlyLogs').config;
            log4js.configure(configForLogs);
        } catch (err) {
            console.log(`Can't run logger`);
        }
    } else {
        try {
            fs.ensureDirSync(path.join(__filename, '..', '..', 'log'));
            let config = require('./log4jsConfig').config;
            log4js.configure(config);
        } catch (err) {
            let configForLogs = require('./log4jsConfigOnlyLogs').config;
            log4js.configure(configForLogs);
            logger.debug(`Can't save logs`)
        }
    }
    logger.trace(`--------------------------------- Using CloudUx starter kit service ---------------------------------`);
    logger.trace(`System information: `, os.type(), ` `, os.release(), ` `, os.platform(), ` Node Information: `, process.versions);
}

module.exports = {log4JsConfiguration};
