"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const fileTypes = require("../util/fileTypes");
const pathResolver = require('../util/pathResolver');

module.exports = function assetsModel(server, id){
    const path = pathResolver(id);
    let file = server.fs.getFile(path);
    return {
        "_links": {
            "aa:asset": {
                "href": server.url("assets" + path)
            },
            "curies": [
                {
                    "name": "aa",
                    "href": "http://services.avid.com/ctms/assets/{rel}",
                    "templated": true
                }
            ],
            "self": {
                "href": server.url("assets-model" + path)
            }   
        },
        "attributes":  {
            common: [
                {
                    id: "creator",
                    description: "File creator",
                    labels: {
                        en: "Creator"
                    },
                    type: {
                        baseType: "string"
                    },
                    flags: [
                        "readOnly"
                    ]
                },
                {
                    id: "size",
                    description: "File size",
                    labels: {
                        en: "File size"
                    },
                    type: {
                        baseType: "int"
                    },
                    flags: [
                        "readOnly"
                    ]
                },
                {
                    id: "created",
                    description: "Creation date",
                    labels: {
                        en: "Created"
                    },
                    type: {
                        baseType: "dateTime"
                    },
                    flags: [
                        "readOnly"
                    ]
                },
                {
                    dd: "modifier",
                    description: "File last time modifier",
                    labels: {
                        en: "Modifier"
                    },
                    type: {
                        baseType: "string"
                    },
                    flags: [
                        "readOnly"
                    ]
                },
                {
                    id: "name",
                    description: "Name",
                    labels: {
                        en: "Name"
                    },
                    type: {
                        baseType: "string"
                    },
                    flags: [
                        "readOnly"
                    ]
                },
                {
                    id: "modified",
                    description: "Last modification date",
                    labels: {
                        en: "Modified"
                    },
                    type: {
                    baseTypeb: "dateTime"
                    },
                    flags: [
                        "readOnly"
                    ]
                }
            ],
            custom: [
                {
                    id: "path",
                    appliesTo: [
                        "aa:asset",
                        "loc:item"
                    ],
                    labels: {
                        en: "File path"
                    },
                    type: {
                        baseType: "string"
                    },
                    flags: [
                        "reaOnly"
                    ]
                },
                {
                    id: "isdirectory",
                    appliesTo: [
                        "aa:asset",
                        "loc:item"
                    ],
                    labels: {
                        en: "Directory"
                    },
                    type: {
                        baseType: "boolean"
                    },
                    flags: [
                        "readOnly"
                    ]
                }
            ]
        },
        "layout": {
            "simpleTimeBasedLayout": [],
            "attributeGroupLayout": [
                {
                    "id": "0",
                    "labels": {
                        "en": "Common attributes"
                    },
                    "items": [
                        {
                            "id": "name",
                            "common": true
                        },
                        {
                            "id": "size",
                            "common": true
                        },
                        {
                            "id": "creator",
                            "common": true
                        },
                        {
                            "id": "created",
                            "common": true
                        },
                        {
                            "id": "modifier",
                            "common": true
                        },
                        {
                            "id": "modified",
                            "common": true
                        }
                    ]
                },
                {
                    "id": "1",
                    "labels": {
                        "en": "Custom attributes"
                    },
                    "items": [
                        {
                            "id": "isdirectory",
                            "common": file.type === fileTypes.folder
                        },
                        {
                            "id": "path",
                            "common": false
                        }
                    ]
                }
            ]
        }
    }
}
