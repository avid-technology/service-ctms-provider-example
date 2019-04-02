const config = {
    'appenders': {
        'app': {
            'type': 'fileSync',
            'filename': 'log/app.log',
            'maxLogSize': 10485760,
            'numBackups': 3,
        },
        'logsConsole': {
            'type': 'console',
        },
        'errorFile': {
            'type': 'fileSync',
            'filename': 'log/errors.log',
        },
        'errors': {
            'type': 'logLevelFilter',
            'level': 'ERROR',
            'appender': 'errorFile',
        },
        'logs': {
            'type': 'logLevelFilter',
            'level': 'DEBUG',
            'appender': 'logsConsole',
        },
    },
    'categories': {
        'default': {'appenders': ['app', 'errors', 'logs'], 'level': 'TRACE'},
    },
};

module.exports = {
    config,
};
