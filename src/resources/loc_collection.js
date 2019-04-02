"use strict";
Object.defineProperty(exports, "__esModule", {value: true});

const linksLib = require("./links.js");
const _embedded = require('./_embedded.js');
const loc_item = require("./loc_item.js");
const fileTypes = require("../util/fileTypes.js");
const constans = require('../constans').pathConfig;

function getPaging(items) {
    return {
        limit: 1000,
        offset: 0,
        elements: items.length,
        totalElements: items.length
    };
}

function create(server, id, items, filter) {
    return {
        paging: getPaging(items),
        base: linksLib.base(server, file, id),
        common: linksLib.common(server, file, id),
        _links: linksLib.links(server, file, id),
        _embedded: _embedded(server, file, id)
    };
}

exports.create = create;

function collection(server, id, items, filter) {
    const helperConfig = require('../../helper.config.json')
    return {
        paging: getPaging(items),
        _links: {
            self: {
                href: server.url("collection" + id)
            },
            first: {
                href: server.url("collection" + id)
            },
            next: {
                href: server.url("collection" + id)
            },
            "loc:item": items.map((item) => {
                return {
                    href: item.type === fileTypes.folder ?
                        (server.url("folders" + item.path)) : server.url("items" + '/%2Fassets%2F' + item.path.substring(1))
                }
            }),
            curies: [
                {
                    name: "loc",
                    href: "http://services.avid.com/apis/locations{rel}",
                    templated: true
                }
            ]
        },
        _embedded: {
            "loc:item": items.map((val) => {
                const base = linksLib.base(server, val, val.path);
                const common = linksLib.common(server, val, val.path);
                const result = {
                    "base": base,
                    "common": common,
                    "_links": linksLib.links(server, val, val.path),
                    "_embedded": {
                        "loc:referenced-object": {
                            "base": base,
                            "common": common,
                            _links: {
                                self: {
                                    href: server.url("assets" + val.path)
                                }
                            },
                            _embedded: {}
                        }
                    }
                };
                return result;
            })
        }
    };
}

exports.collection = collection;
