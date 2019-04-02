const config = {
    'appenders': {
        'logs': {
            'type': 'console',
        }
    },
    'categories': {
        'default': {'appenders': ['logs'], 'level': 'TRACE'},
    }
};

module.exports = {
    config,
};
