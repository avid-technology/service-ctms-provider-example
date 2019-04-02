const fileTypes = require("../util/fileTypes.js");
const _embedded = require('./_embedded.js')
const filesystemStoreDir = require('../constans').pathConfig.cloudUx;

const links = function (server, item, path) {
    let links = {
        self: {
            href: item.type === fileTypes.folder ?
                server.url("folders" + item.path) : server.url("items" + item.path)
        },
        "loc:path-to-root": {
            href: server.url("path" + item.path)
        },
        "curies": [
            {
                name: "loc",
                href: "http://services.avid.com/apis/locations{rel}",
                templated: true
            }
        ]
    }
    if (item.type === fileTypes.folder) {
        links = {
            ...links, ...{
                "loc:collection": {
                    href: server.url("collection" + (item.path.length > 2 ? item.path : '/%2F'))
                }
            }
        }
    } else if (item.type === fileTypes.asset.VIDEO) {
        links = {
            ...links, ...{
                "loc:referenced-object": {
                    href: server.url("assets" + path)
                }
            }
        }
    }
    return links;
};

const base = function (server, item, path, priorytySystemType) {
    const object = {name: item};
    object.type = path.includes('assets') ? 'asset.video' : 'folder';
    return {
        id: path,
        systemType: server.systemType,
        systemID: server.systemID,
        type: object.type
    }
};

const common = function (server, item, path) {
    let common = {
        name: item.name,
        modified: item.modified,
        modifier: item.modifier,
        created: item.created,
        creator: item.modifier,
        size: item.size
    }
    if (item.type === fileTypes.asset.VIDEO) {
        common = {
            ...common, ...{
                'durationTC': "00;10;02;18",
                'editRate': "29.97",
                'endTC': "11;43;33;19",
                'startTC': "11;33;31;01"
            }
        }
    }
    return common
}

const embedded = function (server, item, path) {
    return _embedded(server, item, path)
}

module.exports = {
    links: links,
    common: common,
    base: base,
    embedded: embedded
}
