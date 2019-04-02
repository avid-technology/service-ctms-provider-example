"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function resource(server, href, templated, templateParams, param, fullHref) {
    if (templated === void 0) { templated = false; }
    if (templateParams === void 0) { templateParams = {}; }
    return {
        href: fullHref ? fullHref : (param ? server.url(href+'/{'+param+'}') : server.url(href)),
        templated: templated,
        templateParams,
        systems: [
            {
                name: "filesystem-example",
                systemType: "filesystem-example",
                id: "2",
                systemID: "filesystem-example"
            }
        ]
    };
}
function serviceRoot(server) {
    const resources = {
        "loc:locations": [resource(server, "locations")],
        "loc:root-item": [resource(server, "root-item", true)],
    };
    return {
        systems: [
            {
                name: "filesystem-example",
                systemType: "filesystem-example",
                id: "1",
                systemID: "filesystem-example"
            }
        ],
        resources: resources,
        _links: {
            "aa:assets": {
                href: server.url("assets"),
                title: "filesystem-example",
                templated: true
            },
            "loc:locations": {
                href: server.url("loc_locations"),
                title: "filesystem-example",
                templated: true
            },
            curies: [
                {
                    name: "loc",
                    href: "http://services.avid.com/apis/locations{rel}",
                    templated: true
                },
                {
                    name: "aa",
                    href: "http://services.avid.com/apis/assets{rel}",
                    templated: true
                },
                {
                    name: "datamodel",
                    href: "http://services.avid.com/apis/datamodel{rel}",
                    templated: true
                }
            ]
        }
    };
}
exports.serviceRoot = serviceRoot;
//# sourceMappingURL=serviceroot.js.map
