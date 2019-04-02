"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const loc_item = require("../resources/loc_item.js");
const loc_collection = require("../resources/loc_collection.js");
const pathResolver = require('../util/pathResolver');
const ctmsJson = require('../../ctms_provider');

function loc_locations(server) {
    const links = {
        self: {
            href: server.url("locations")
        },
        "loc:root-item": {
            href: server.url("items") + "%2F",
        },
        curies: [
            {
                name: "loc",
                href: "http://services.avid.com/apis/locations{rel}",
                templated: true
            },
        ]
    };
    return {
        base: {
            systemType: "filesystem",
            systemID: "1"
        },
        _links: links
    };
}

exports.loc_locations = loc_locations;

function loc_path(server, id) {
    const path = pathResolver(id);
    let file = readJsonPath(path);
    return file["error code"] ? file : loc_item.path(server, file);
}

exports.loc_path = loc_path;

function loc_item_for_id(server, id) {
    const path = pathResolver(id);
    let file = readJsonItem(path);
    return file["error code"] ? file : loc_item.create(server, file);
}

exports.loc_item_for_id = loc_item_for_id;

function loc_collection_for_id(server, filter, id) {
    const path = pathResolver(id);
    const items = readJsonPath(id);
    return items["error code"] ? items : loc_collection.create(server, path, items, filter);
}

exports.loc_collection_for_id = loc_collection_for_id;

function collection(server, filter, id) {
    const path = pathResolver(id);
    const items = readJsonPath(id, filter);
    return items["error code"] ? items : loc_collection.collection(server, path, items, filter);
}

exports.collection = collection;

//# sourceMappingURL=location.js.map

function readJsonPath(path, filter) {
    let files = [];
    let id = path;
    if (id.startsWith('/')) {
        id = id.substr(1, id.length);
    }
    const test = id.split("/");
    let tempArray = JSON.parse(JSON.stringify(ctmsJson));
    if (path.toString().length > 1) {
        test.forEach(item => {
            tempArray = tempArray[item];
        })
    }
    if (tempArray.assets && filter !== 'item-type-folder') {
        tempArray.assets.forEach((item => {
                files.push(
                    {
                        modifier: 'root',
                        modified: new Date(),
                        created: new Date(),
                        size: Math.floor(Math.random() * 9432430 + 1),
                        path: '//assets' + path + '/' + item,
                        name: item,
                        type: 'asset.video'
                    }
                )
            })
        );
    }
    delete tempArray.assets;
    if (tempArray.collection) delete tempArray.collection;
    const tempArrayContent = Object.keys(tempArray);
    tempArrayContent.forEach(folder => {
        if (Array.isArray(tempArray[`${folder}`])) {
            delete tempArray[`${folder}`];
        } else {
            files.push({
                modifier: 'root',
                modified: new Date(),
                created: new Date(),
                size: 0,
                path: '/' + path + '/' + folder,
                name: folder,
                type: 'folder'
            })
        }
    });
    return files
}

function readJsonItem(path) {
    if (path.includes('assets')) {
        return ({
            modifier: 'root',
            modified: new Date(),
            created: new Date(),
            size: 0,
            path: path,
            name: 'filesystem-assets',
            type: 'asset.video'
        })
    }
    return ({
        modifier: 'root',
        modified: new Date(),
        created: new Date(),
        size: 0,
        path: path,
        name: 'filesystem-assets',
        type: 'folder'
    })
}
