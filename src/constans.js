const path = require('path');
const ctmsProvider = require('../ctms_provider');

const local = true;

const assetsPath = {
    // Do you want to run on localhost on or kubernetes cluster
    // Local
    // source: path.join(__dirname, 'filesystem-assets'),
    // Docker
    // source: './src/filesystem-source',
    source: local ? path.join(__dirname, 'filesystem-assets') : './src/filesystem-source',
    // source: ctmsProvider,
    cloudUx: './src/filesystem'
}

module.exports = Object.freeze({
    pathConfig: assetsPath
});
