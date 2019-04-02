const fileTypes = require("../util/fileTypes.js");
const jsonPathResolver = require('../util/jsonPathResolver');

function assetVideo(_embedded, server, item, path){
    const linksLib = require("./links.js");
    _embedded["loc:referenced-object"] = {
        base: linksLib.base(server, item.name, path, item.path),
        common: linksLib.common(server, item, path),
        _links: {
            "self": {
                href: server.url("items/" + path.substring(1))
            },
            "aa:thumb": {
                href: server.url("getImage" + path)
            }
        }
    };
}

function folder(_embedded, server, item, path){
    const linksLib = require("./links.js");
    let items = jsonPathResolver(path);
    _embedded["loc:collection"] = {
        "paging": {
            "limit": 999,
            "offset": 0,
            "elements": items.length,
            "totalElements": items.length
        },
        "_links": {
            "self": {
                href: server.url("collection" + path)
            },
            "first": {
                href: server.url("collection" + path)
            },
            "loc:item": items.map((val)=>{
                return val.type === fileTypes.folder ?({
                    href: server.url("folders" + val.path)
                }) : ({ href: server.url("items" + val.path.substring(1))})
            }),
            "curies":[
                {
                    name: "loc",
                    href: "http://services.avid.com/apis/locations{rel}",
                    templated: true
                }
            ]
        },
        "_embedded": {
            "loc:item": items.map((val)=>{
                let espacedPath = decodeURIComponent(val.path);
                return {
                    "base": linksLib.base(server, val.name, espacedPath, val.path),
                    "common": linksLib.common(server, val, espacedPath),
                    "_links": linksLib.links(server, val, espacedPath)
                };
            })
        }
    }
}

module.exports = function(server, item, path){
    let _embedded = {}
    switch (item.type){
        case fileTypes.asset.VIDEO:
            assetVideo(_embedded, server, item, path)
            break;
        case fileTypes.folder:
            folder(_embedded, server, item, path)
            break;
    }
    return _embedded
};
