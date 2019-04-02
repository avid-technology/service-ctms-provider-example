const ctmsJson = require('../../ctms_provider');

module.exports = function jsonPathResolver(path) {
    let list = [];
    let filePath = null;
    let tempJson = JSON.parse(JSON.stringify(ctmsJson));
    if (path === "/" || path === "") {
        filePath = "/";
        if (tempJson.collection) delete tempJson.collection;
        if (tempJson.assets) {
            tempJson.assets.forEach(asset => {
                list.push({
                    "modified": new Date(),
                    "created": new Date(),
                    modifier: 'root',
                    name: asset,
                    path: filePath + '/assets/' + asset,
                    size: Math.floor(Math.random() * 10000),
                    type: 'loc-item'
                })
            })
        }
        delete tempJson.assets;
    } else {
        tempJson.forEach(item => {
            filePath = filePath + item.toString();
            tempJson = tempJson[item];
        });
        if (tempJson.collection) delete tempJson.collection;
        if (tempJson.assets) delete tempJson.assets;
    }
    Object.keys(tempJson)
        .forEach(item => {
            if (Array.isArray(tempJson[`${item}`])) {
                delete tempJson[`${item}`];
            } else {
                list.push({
                    "modifier": "root",
                    "modified": new Date(),
                    "created": new Date(),
                    "size": 0,
                    "path": filePath + `${item}`,
                    "name": item,
                    "type": "folder"
                })
            }
        });
    return list;
};
