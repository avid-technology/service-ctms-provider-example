"use strict";
Object.defineProperty(exports, "__esModule", {value: true});

const linksLib = require("./links.js");

function create(server, item) {

    const escapedPath = item.path;
    const base = linksLib.base(server, item, escapedPath);
    const common = linksLib.common(server, item, escapedPath);
    const links = linksLib.links(server, item, escapedPath);
    const _embedded = linksLib.embedded(server, item, escapedPath);
    const result = {
        base: base,
        common: common,
        _links: links,
        _embedded: _embedded
    };
    return result
}

exports.create = create;
